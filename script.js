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
  firstNumber = displayText.value;
  currentOperator = operator;
  shouldResetDisplay = true;
}

// ========================
// EVALUATE CALCULATIONS
// ========================

function evaluate() {
  if (currentOperator === null || firstNumber === "") return "ERROR";
  if (currentOperator === "/" && displayText.value === "0") {
    alert("You can't divide by 0, dummy!");
    return;
  }
  secondNumber = displayText.value;
  const result = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );

  //Round to avoid decimals
  const roundedResult = Math.round(result * 100000) / 100000;

  updateDisplay(roundedResult);
  firstNumber = roundedResult.toString(); // Store result for chaining
  currentOperator = null;
  shouldResetDisplay = true; // Next number starts fresh
}

// ========================
// DISPLAY
// ========================

function appendNumber(number) {
  if (shouldResetDisplay === true) {
    updateDisplay("");
    shouldResetDisplay = false;
  }

  if (displayText.value === "0") {
    updateDisplay(number);
  } else {
    updateDisplay(displayText.value + number);
  }
}

function updateDisplay(value) {
  displayText.value = value;
}

// ========================
// EVENT LISTENERS
// ========================

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const operator = btn.getAttribute("data-operator");
    setOperator(operator);
  });
});

clearBtn.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = "";
  updateDisplay("0");
});

deleteBtn.addEventListener("click", () => {
  const current = displayText.value;
  if (current.length === 1 || current === "0") {
    updateDisplay("0");
  } else {
    updateDisplay(current.slice(0, -1));
  }
});

equalsBtn.addEventListener("click", () => {
  evaluate();
  shouldResetDisplay = true;
});

decimalBtn.addEventListener("click", () => {
  if (shouldResetDisplay === true) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  }
  if (displayText.value.includes(".")) {
    return;
  }

  updateDisplay(displayText.value + ".");
});
