const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); // Select the input element with class "amount" and type "input"
  let amtVal = amount.value; // Get the value entered by the user in the input field
  // Check if the entered amount is empty or less than 1
  if (amtVal === "" || amtVal < 1) {
    // If true, set the amount to 1 and update the input field
    amtVal = 1;
    amount.value = "1";
  }
  // Construct the URL for fetching the exchange rate data
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL); // Fetch exchange rate data from the specified URL
  let data = await response.json(); // Parse the response as JSON
  let rate = data[toCurr.value.toLowerCase()]; // Get the exchange rate for the target currency

  // Calculate the final amount by multiplying the entered amount with the exchange rate
  let finalAmount = amtVal * rate;
  // Update a DOM element with the result message
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});