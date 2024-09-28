let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        header.style.top = '-70px';
    } else {
        header.style.top = '0';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});