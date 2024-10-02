document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('hours')
        .addEventListener('input', calculateTotal);

    document.querySelectorAll('.calculator__radio, .calculator__checkbox')
        .forEach(item => item.addEventListener('change', calculateTotal));
});

const additionalServices = [
    { id: 'mixing', text: "Сведение", price: 500 },
    { id: 'design', text: "Графический дизайн", price: 700 },
    { id: 'mastering', text: "Технический монтаж / мастеринг", price: 800 },
    { id: 'ghostwriter', text: "Гострайт / написание текста", price: 1000 },
    { id: 'instrumental', text: "Инструментал / создание аранжировок", price: 1200 },
    { id: 'song-for-key', text: "Песня под ключ", price: 1500 }
];

function createResultItemBlock(description, price) {
    return `
        <div class="calculator__result-item">
            <div class="calculator__result-item-work">${description}</div>
            <div class="calculator__result-item-price">${price}</div>
        </div>
    `;
}

function getCostOfRent() {
    const isStandardRent = document.querySelector('#standardRent').checked;
    const isProRent = document.querySelector('#proRent').checked;
    return isStandardRent ? 1000 : isProRent ? 2000 : 0;
}

function calculateServiceCost(hours, costOfRent) {
    if (hours > 0 && costOfRent > 0) {
        return {
            description: costOfRent === 1000 ? "Аренда студии" : "Аренда студии с Профи",
            cost: hours * costOfRent
        };
    }
    return null;
}

function calculateTotal() {
    const hours = parseInt(document.querySelector('#hours').value) || 0;
    const costOfRent = getCostOfRent();
    let totalCost = 0;
    let resultHtml = '';

    const serviceCost = calculateServiceCost(hours, costOfRent);
    if (serviceCost) {
        totalCost += serviceCost.cost;
        resultHtml += createResultItemBlock(serviceCost.description, serviceCost.cost);
    }

    additionalServices.forEach(service => {
        if (document.getElementById(service.id).checked) {
            totalCost += service.price;
            resultHtml += createResultItemBlock(service.text, service.price);
        }
    });

    updateResult(totalCost, resultHtml);
}

function updateResult(totalCost, resultHtml) {
    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('sum').textContent = `Итого: ${totalCost} руб.`;
}
