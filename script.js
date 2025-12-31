// ========================
// DOM
// ========================
const displayText = document.getElementById("displayText");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const equalsBtn = document.getElementById("equalsBtn");
const decimalBtn = document.getElementById("decimalBtn");

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

function setOperator(operator) {
  if (currentOperator !== null && shouldResetDisplay === false) {
    evaluate();
  }
  firstNumber = displayText.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

// ========================
// EVALUATE CALCULATIONS
// ========================

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  if (currentOperator === "/" && displayText.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondNumber = displayText.textContent;
  const result = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );
  updateDisplay(result);
  currentOperator = null;
}

// ========================
// DISPLAY
// ========================

function appendNumber(number) {
  if (shouldResetDisplay === true) {
    updateDisplay("");
    shouldResetDisplay = false;
  }

  if (displayText.textContent === "0") {
    updateDisplay(number);
  } else {
    updateDisplay(displayText.textContent + number);
  }
}

function updateDisplay(value) {
  displayText.textContent = value;
}

function clear() {
  updateDisplay("0");
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function deleteNumber() {
  displayText.textContent = displayText.textContent.toString().slice(0, -1);
}

function appendDecimal() {
  if (shouldResetDisplay) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  }
  if (!displayText.textContent.includes(".")) {
    updateDisplay(displayText.textContent + ".");
  }
}

// ========================
// EVENT LISTENERS
// ========================

equalsBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
decimalBtn.addEventListener("click", appendDecimal);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => setOperator(btn.dataset.operator));
});
