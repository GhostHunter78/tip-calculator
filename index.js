"use strict";

const billInput = document.querySelectorAll(".bill-input");
const peopleInput = document.querySelector(".people-input");
const errorMessage = document.querySelector(".error-message");
const button = document.querySelector(".reset-button");

// if a client doesn't enters persons' quantity, the error message will be printed

let clicked = false;

button.addEventListener("click", () => {
  clicked = true;

  if (
    peopleInput.value === "0" ||
    peopleInput.value === "" ||
    peopleInput.value === 0
  ) {
    errorMessage.style.display = "block";
    peopleInput.style.border = "2px solid #E17052";
  } else {
    errorMessage.style.display = "none";
    peopleInput.style.borderColor = "#00474b";
  }
});

peopleInput.addEventListener("input", () => {
  if (clicked) {
    if (peopleInput.value.length > 0) {
      errorMessage.style.display = "none";
      peopleInput.style.border = "#00474b";
    } else {
      errorMessage.style.display = "block";
      peopleInput.style.border = "2px solid #E17052";
    }
  }
});
