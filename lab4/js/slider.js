document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".cards-slider");

    sliders.forEach(sliderContainer => {
        const cardsList = sliderContainer.querySelector(".cards-list");
        const buttonLeft = sliderContainer.querySelector(".cards-slider__control--left");
        const buttonRight = sliderContainer.querySelector(".cards-slider__control--right");
        const cardWidth = getCardWidth(cardsList);

        setupControls(cardsList, buttonLeft, buttonRight, cardWidth);
        const pointsContainer = initializePoints(sliderContainer, cardsList);

        addEventListeners(cardsList, buttonLeft, buttonRight, pointsContainer);
    });
});

function getCardWidth(cardsList) {
    return cardsList.querySelector(".card").offsetWidth + 10;
}

function setupControls(cardsList, buttonLeft, buttonRight, cardWidth) {
    buttonRight.addEventListener("click", () => {
        cardsList.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    buttonLeft.addEventListener("click", () => {
        cardsList.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
}

function initializePoints(sliderContainer, cardsList) {
    const pointsContainer = createPointsContainer();
    const pointsSize = calculatePointsSize(cardsList.childElementCount);

    addPointsToSlider(pointsSize, pointsContainer);
    sliderContainer.appendChild(pointsContainer);

    updateControlsOpacity(
        cardsList,
        sliderContainer.querySelector(".cards-slider__control--left"),
        sliderContainer.querySelector(".cards-slider__control--right")
    );
    updateActivePoints(cardsList, pointsSize, pointsContainer);

    return pointsContainer;
}

function createPointsContainer() {
    const points = document.createElement("div");
    points.classList.add("points");
    return points;
}

function calculatePointsSize(cardsCount) {
    if (window.innerWidth >= 1024) return cardsCount - 2;
    if (window.innerWidth >= 768) return cardsCount - 1;
    return cardsCount;
}

function addPointsToSlider(pointsSize, pointsContainer) {
    for (let i = 0; i < pointsSize; i++) {
        const point = createPointItem(i === 0);
        pointsContainer.appendChild(point);
    }
}

function createPointItem(isActive) {
    const point = document.createElement("div");
    point.classList.add("points__item");
    if (isActive) point.classList.add("points__item--active");
    return point;
}

function updateControlsOpacity(cardsList, buttonLeft, buttonRight) {
    buttonLeft.style.opacity = cardsList.scrollLeft <= 0 ? "0.25" : "1";
    buttonRight.style.opacity = cardsList.scrollLeft + cardsList.clientWidth >= cardsList.scrollWidth ? "0.25" : "1";
}

function updateActivePoints(cardsList, pointsSize, pointsContainer) {
    const scrollPosition = cardsList.scrollLeft;
    const totalScrollableWidth = cardsList.scrollWidth - cardsList.clientWidth;

    const activeIndex = Math.round((scrollPosition / totalScrollableWidth) * (pointsSize - 1));
    setActivePoint(activeIndex, pointsContainer);
}

function setActivePoint(index, pointsContainer) {
    const points = pointsContainer.querySelectorAll(".points__item");
    points.forEach((point, i) => {
        point.classList.toggle("points__item--active", i === index);
    });
}

function updatePointsOnResize(pointsContainer, cardsList) {
    const pointsSize = calculatePointsSize(cardsList.childElementCount);
    pointsContainer.innerHTML = '';
    addPointsToSlider(pointsSize, pointsContainer);
    setActivePoint(0, pointsContainer);
}

function addEventListeners(cardsList, buttonLeft, buttonRight, pointsContainer) {
    cardsList.addEventListener("scroll", () => {
        updateControlsOpacity(cardsList, buttonLeft, buttonRight);
        updateActivePoints(cardsList, pointsContainer.childElementCount, pointsContainer);
    });

    window.addEventListener("resize", () => {
        updatePointsOnResize(pointsContainer, cardsList);
    });
}
