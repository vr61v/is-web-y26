document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section')

    function addActiveClass(sectionId) {
        const activeLink = document.querySelector(`.header__link[href="#${sectionId}"]`);

        if (activeLink) {
            activeLink.classList.add('header__link--active');
            scrollToActiveLink(activeLink);
        }
    }

    function scrollToActiveLink(activeLink) {
        const linksContainer = document.querySelector('.header__links');
        const linkOffsetLeft = activeLink.offsetLeft;
        const linkWidth = activeLink.offsetWidth;
        const containerWidth = linksContainer.offsetWidth;

        linksContainer.scrollLeft = linkOffsetLeft - (containerWidth / 2) + (linkWidth / 2);
    }

    function moveLinksBlock() {
        const headerLinks = document.querySelector('#headerLinks');
        const isParentNavigation = headerLinks.parentElement.classList.contains('header__navigation')

        if (window.innerWidth < 768 && isParentNavigation) {
            document.querySelector('#headerLinks').remove();
            let header = document.querySelector('header')
            header.innerHTML = headerLinks.outerHTML + header.innerHTML;
        }
        else if (window.innerWidth >= 768 && !isParentNavigation) {
            document.querySelector('#headerLinks').remove();
            let navigation = document.querySelector('.header__navigation');
            navigation.innerHTML = headerLinks.outerHTML + navigation.innerHTML;
        }
    }

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            document.querySelector('.header__link--active')
                .classList.remove('header__link--active');
            addActiveClass(currentSectionId);
        }
    });


    window.addEventListener('resize', () => {moveLinksBlock()});
    window.addEventListener('load', () => {moveLinksBlock()});
});

function burger() {
    const burgerMenu = document.getElementById('burger');
    const navLinks = document.querySelector('.header__links');
    burgerMenu.classList.toggle('header__burger--active');
    navLinks.classList.toggle('header__links--open');
}