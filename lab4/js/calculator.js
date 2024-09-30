document.getElementById('hours').addEventListener('input', calculateTotal);

document.querySelectorAll('.calculator__radio, .calculator__checkbox').forEach(item => {
    item.addEventListener('change', calculateTotal);
});

function createAdditionalServiceBlock(typeId, typeText, price) {
    return `<div class="calculator__result-item" id="result-item-${typeId}">
                <div class="calculator__result-item-work"> ${typeText} </div>
                <div class="calculator__result-item-price"> ${price} </div>
            </div>`
}

function calculateTotal() {
    let result = 0;
    let resultHtml = ``;

    const hours = parseInt(document.getElementById('hours').value) || 0;

    const isPro = document.getElementById('pro').checked;
    const baseRate = isPro ? 2000 : 1000;
    result += hours * baseRate;

    if (hours > 0) {
        resultHtml += `<div class="calculator__result-item" id="result-item-hours">
                            <div class="calculator__result-item-work">${isPro ? "Аренда студии с Профи" : "Аренда студии"}</div>
                            <div class="calculator__result-item-price"> ${hours * baseRate} </div>
                       </div>`
    }

    const additionalServices = [
        { id: 'mixing', text: "Сведение", price: 500 },
        { id: 'design', text: "Графический дизайн", price: 700 },
        { id: 'mastering', text: "Технический монтаж / мастеринг", price: 800 },
        { id: 'ghostwriter', text: "Гострайт / написание текста", price: 1000 },
        { id: 'instrumental', text: "Инструментал / создание аранжировок", price: 1200 },
        { id: 'song-for-key', text: "Песня под ключ", price: 1500 }
    ];

    additionalServices.forEach(service => {
        if (document.getElementById(service.id).checked) {
            result += service.price;
            resultHtml += createAdditionalServiceBlock(service.id, service.text, service.price);
        }
    });

    document.getElementById('sum').textContent = `Итого: ${result} руб.`;
    document.getElementById('result').innerHTML = resultHtml;
}


