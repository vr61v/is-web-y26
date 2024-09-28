document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".cards-slider");

    sliders.forEach(sliderContainer => {
        const slider = sliderContainer.querySelector(".cards-list");
        const buttonLeft = sliderContainer.querySelector(".cards-slider__control--left");
        const buttonRight = sliderContainer.querySelector(".cards-slider__control--right");

        const cardWidth = slider.querySelector(".card").offsetWidth + 10;

        buttonRight.addEventListener("click", () => {
            slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        buttonLeft.addEventListener("click", () => {
            slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        const updateControlsOpacity = () => {
            if (slider.scrollLeft <= 0) {
                buttonLeft.style.opacity = 0.25;
            } else {
                buttonLeft.style.opacity = 1;
            }

            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                buttonRight.style.opacity = 0.25;
            } else {
                buttonRight.style.opacity = 1;
            }
        };

        updateControlsOpacity();
        slider.addEventListener("scroll", updateControlsOpacity);
    });
});
