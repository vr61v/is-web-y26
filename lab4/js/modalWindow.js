document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementsByTagName("body")[0];

    function initModal(modalId, openButtonId, closeButtonId) {
        const modal = document.getElementById(modalId);
        const openButton = document.getElementById(openButtonId);
        const closeButton = document.getElementById(closeButtonId);

        openButton.onclick = () => {
            modal.classList.add('modal-window__open');
            body.classList.add('body__modal-open');
        };

        closeButton.onclick = () => {
            modal.classList.remove('modal-window__open');
            body.classList.remove('body__modal-open');
        };
    }

    window.onclick = (event) => {
        const openModals = document.querySelectorAll('.modal-window__open');
        openModals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('modal-window__open');
                body.classList.remove('body__modal-open');
            }
        });
    };

    initModal("rules", "rulesOpenButton", "rulesCloseButton");
    initModal("calculator", "calculatorOpenButton", "calculatorCloseButton");
});
