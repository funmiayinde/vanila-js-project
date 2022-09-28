const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleIncomeBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

for (let i = 0; i < 3; i++) {
  getRandomUser();
}
// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new Obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleIncomeBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortMoney);
calculateWealthBtn.addEventListener("click", calculateTotal);

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div

  main.innerHTML = "<h2><strong>Person</strong> wealth</h2>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    const money = formatMoney(person.money);
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${money}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

function doubleMoney() {
  data = data.map((user) => ({
    ...user,
    money: user.money * 2,
  }));
  updateDOM();
}

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function sortMoney() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calculateTotal() {
  const wealth = data.reduce((acc, curr) => {
    return (acc += curr.money);
  }, 0);

  const total = formatMoney(wealth);

  const wealthElem = document.createElement("div");
  wealthElem.innerHTML = `<h3>Total Wealth: <strong>${total}</strong></h3>`;
  main.appendChild(wealthElem);
}
