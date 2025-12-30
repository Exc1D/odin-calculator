// ========================
// DOM
// ========================
const displayText = document.getElementById("displayText");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const equalsBtn = document.getElementById("equalsBtn");

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");

// ========================
// GLOBAL VARIABLES
// ========================

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// ========================
// OPERATOR FUNCTIONS
// ========================
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else {
    return "ERROR";
  }
}
