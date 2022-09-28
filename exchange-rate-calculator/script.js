const currentElementOne = document.getElementById("currency-one");
const currentElementTwo = document.getElementById("currency-two");

const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

const rateElem = document.getElementById("rate");

const swap = document.getElementById("swap");

/**
 * Fetch exchange rates and update the DOM
 */
function calculate() {
  const currencyOne = currentElementOne.value;
  const currencyTwo = currentElementTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/3d03ca0152aff5e51ce880e1/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyTwo];
      rateElem.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

// Event Listeners
currentElementOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currentElementTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", (e) => {
  e.preventDefault();
  const temp = currentElementOne.value;
  currentElementOne.value = currentElementTwo.value;
  currentElementTwo.value = temp;

  calculate();
});

calculate();
