"use strict";

const billInput = document.querySelector(".bill-input");
const inputs = document.querySelectorAll(".inputs");
const peopleInput = document.querySelector(".people-input");
const errorMessage = document.querySelector(".error-message");
const billError = document.querySelector(".billError");
const numberError = document.querySelector(".numberError");
const resetButton = document.querySelector(".reset-button");
const tipPercentageDiv = document.querySelectorAll(".tip-percentage-div");
const tipAmountResult = document.querySelector(".tip-amount-result");
const totalResult = document.querySelector(".total-result");
const five = document.querySelector(".five");
const ten = document.querySelector(".ten");
const fifteen = document.querySelector(".fifteen");
const twentyfive = document.querySelector(".twentyfive");
const fifty = document.querySelector(".fifty");
const customDiv = document.querySelector(".custom-div");

let clicked = false;
let percent = 0;
let customPercent = 0;
let selectedTip = null;
resetButton.disabled = true;

billInput.addEventListener("input", () => {
  clicked = true;
  resetButton.disabled = false;

  if (billInput.value === "0" || billInput.value === "") {
    billError.style.display = "block";
    billInput.style.border = "2px solid #E17052";
  } else {
    billError.style.display = "none";
    billInput.style.borderColor = "#00474b";
    calculateResults();
  }

  if (peopleInput.value === 0 && percent === 0 && customPercent === 0) {
    resetButton.style.backgroundColor = "#0D686D";
    resetButton.style.color = "#00474B";
  } else {
    resetButton.style.backgroundColor = "#9FE8DF";
    resetButton.style.color = "#00474B";
  }

  if (!clicked) {
    if (billInput.value.length > 0) {
      billError.style.display = "none";
      billInput.style.border = "none";
    } else {
      billError.style.display = "block";
      billInput.style.border = "2px solid #E17052";
    }
  }
});

// if a client doesn't enters persons' quantity, the error message will be printed
peopleInput.addEventListener("input", () => {
  clicked = true;
  resetButton.disabled = false;

  if (
    peopleInput.value === "0" ||
    !Number.isInteger(parseFloat(peopleInput.value))
  ) {
    numberError.style.display = "block";
    peopleInput.style.border = "2px solid #E17052";
  } else {
    numberError.style.display = "none";
    peopleInput.style.borderColor = "#00474b";
    calculateResults();
  }

  if (billInput.value === 0 && percent === 0 && customPercent === 0) {
    resetButton.style.backgroundColor = "#0D686D";
    resetButton.style.color = "#00474B";
  } else {
    resetButton.style.backgroundColor = "#9FE8DF";
    resetButton.style.color = "#00474B";
  }

  if (!clicked) {
    if (peopleInput.value.length > 0) {
      numberError.style.display = "none";
      billInput.style.border = "none";
    } else {
      numberError.style.display = "block";
      peopleInput.style.border = "2px solid #E17052";
    }
  }
});

tipPercentageDiv.forEach((tip) => {
  tip.addEventListener("click", () => {
    resetButton.disabled = false;
    // Deselecting the previously selected tip
    if (selectedTip) {
      selectedTip.style.backgroundColor = "#00474b";
      selectedTip.style.color = "#fff";
      resetButton.style.backgroundColor = "#0D686D";
      resetButton.style.color = "#00474B";
    }

    // If the clicked tip is not the currently selected tip, selecting it
    if (tip !== selectedTip) {
      tip.style.backgroundColor = "#9FE8DF";
      tip.style.color = "#00474B";
      resetButton.style.backgroundColor = "#9FE8DF";
      resetButton.style.color = "#00474B";
      selectedTip = tip;
    } else {
      // If the clicked tip is the currently selected tip, deselect it
      selectedTip = null;
    }

    const current = parseInt(tip.textContent);
    percent = current;
    calculateResults();
  });
});

customDiv.addEventListener("input", () => {
  const customNumber = parseInt(customDiv.value);
  customPercent = customNumber;
  resetButton.disabled = false;

  if (selectedTip) {
    selectedTip.style.backgroundColor = "#00474b";
    selectedTip.style.color = "#fff";
    selectedTip = null;
  }

  if (customPercent > 0 && customPercent <= 100) {
    resetButton.style.backgroundColor = "#9FE8DF";
    resetButton.style.color = "#00474B";
    calculateResults();
  } else if (peopleInput.value === "" && billInput.value === "") {
    resetButton.style.backgroundColor = "#0D686D";
    resetButton.style.color = "#00474B";
    resetButton.disabled = false;
  }
});

function calculateResults() {
  const peopleCount = parseInt(peopleInput.value);

  if (billInput.value > 0 && percent > 0 && peopleCount > 0) {
    let tipPerPerson = (billInput.value * (percent / 100)) / peopleCount;
    let totalPerPerson = billInput.value / peopleCount + tipPerPerson;

    tipAmountResult.textContent = "$" + tipPerPerson.toFixed(2);
    totalResult.textContent = "$" + totalPerPerson.toFixed(2);
  } else if (billInput.value > 0 && customPercent > 0 && peopleCount > 0) {
    let tipPerPerson = (billInput.value * (customPercent / 100)) / peopleCount;
    let totalPerPerson = billInput.value / peopleCount + tipPerPerson;

    tipAmountResult.textContent = "$" + tipPerPerson.toFixed(2);
    totalResult.textContent = "$" + totalPerPerson.toFixed(2);
  }
}

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customDiv.value = "";
  tipPercentageDiv.forEach((tip) => {
    tip.style.backgroundColor = "#00474b";
    tip.style.color = "#fff";
  });
  tipAmountResult.textContent = "$0.00";
  totalResult.textContent = "$0.00";
  billError.style.display = "none";
  billInput.style.border = "none";
  numberError.style.display = "none";
  peopleInput.style.border = "none";

  resetButton.style.backgroundColor = "#0D686D";
  resetButton.style.color = "#00474B";
  resetButton.disabled = true;
});
