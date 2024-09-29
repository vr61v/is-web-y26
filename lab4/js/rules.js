document.addEventListener("DOMContentLoaded", () => {
    const body_html = document.getElementsByTagName("body")[0];
    const rules = document.getElementById("rules");
    const rulesOpenButton = document.getElementById("rulesOpenButton");
    const rulesCloseButton = document.getElementById("rulesCloseButton");
    console.log(rulesCloseButton)

    rulesOpenButton.onclick = function() {
        rules.classList.add('rules__open')
        body_html.classList.add('body__modal-open')
    }

    rulesCloseButton.onclick = function() {
        rules.classList.remove('rules__open')
        body_html.classList.remove('body__modal-open')
    }

    window.onclick = function(event) {
        if (event.target === rules) {
            rules.classList.remove('rules__open')
            body_html.classList.remove('body__modal-open')
        }
    }
});