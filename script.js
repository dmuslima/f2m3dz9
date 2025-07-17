const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultElement = document.getElementById("result");

const baseUrl = "https://v6.exchangerate-api.com/v6/5fefd29ab29933152c9f5b5e/latest/USD";

async function fetchCurrency() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log(data);

        const currencies = Object.keys(data.conversion_rates);

        currencies.forEach(valuta => {
            fromCurrency.innerHTML += `<option value="${valuta}">${valuta}</option>`;
            toCurrency.innerHTML += `<option value="${valuta}">${valuta}</option>`;
        });

   
        fromCurrency.value = 'USD';
        toCurrency.value = 'UZS';
    } catch(error) {
        console.log("Xatolik:", error);
    }
}
convertBtn.addEventListener('click', async () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount)) {
        alert("Iltimos, to‘g‘ri summani kiriting!");
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/5fefd29ab29933152c9f5b5e/latest/${from}`);
        const data = await response.json();
        const rate = data.conversion_rates[to];
        const convertedAmount = amount * rate;
        resultElement.textContent = convertedAmount.toFixed(2);
    } catch (error) {
        console.log("Xatolik:", error);
    }
});

fetchCurrency();
