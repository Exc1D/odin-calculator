// ========================
// DOM
// ========================

const displayContainer = document.getElementById("displayContainer");
const displayText = document.getElementById("displayText");
const previousDisplay = document.getElementById("previousDisplay");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");
const equalsBtn = document.getElementById("equalsBtn");
const decimalBtn = document.getElementById("decimalBtn");

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");

// ========================
// STATE VARIABLES
// ========================

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;
let activeOperatorButton = null;

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

function setOperator(operator, buttonElement = null) {
  if (currentOperator !== null && shouldResetDisplay === false) {
    evaluate();
  }
  if (activeOperatorButton !== null) {
    activeOperatorButton.classList.remove("active-operator");
  }
  if (buttonElement !== null) {
    buttonElement.classList.add("active-operator");
    activeOperatorButton = buttonElement;
  }
  firstNumber = displayText.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
  previousDisplay = firstNumber + operator;
}

// ========================
// UTILITY FUNCTIONS
// ========================

function clear() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  updateEquation("");
  updateDisplay("0");
}

function deleteNum() {
  const current = displayText.textContent;
  if (current.length === 1 || current === "0") {
    updateDisplay("0");
  } else {
    updateDisplay(current.slice(0, -1));
  }
}

function addDecimal() {
  if (shouldResetDisplay === true) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  }
  if (displayText.textContent.includes(".")) {
    return;
  }

  updateDisplay(displayText.textContent + ".");
}

function flashButton(button) {
  if (!button) return;
  button.classList.add("keyboard-active");
  setTimeout(() => {
    button.classList.remove("keyboard-active");
  }, 100);
}

// ========================
// EVALUATE CALCULATIONS
// ========================

function evaluate() {
  if (currentOperator === null || firstNumber === "") return "ERROR";
  if (currentOperator === "/" && displayText.textContent === "0") {
    alert("You can't divide by 0, dummy!");
    return;
  }
  secondNumber = displayText.textContent;
  const result = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );

  if (activeOperatorButton !== null) {
    activeOperatorButton.classList.remove("active-operator");
    activeOperatorButton = null;
  }

  //Round to avoid decimals
  const roundedResult = Math.round(result * 100000) / 100000;

  updateEquation(`${firstNumber} ${currentOperator} ${secondNumber} =`);
  updateDisplay(roundedResult);

  // Add flash animation
  displayContainer.classList.add("flash-animation");
  setTimeout(() => {
    displayContainer.classList.remove("flash-animation");
  }, 300);

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

  if (displayText.textContent === "0") {
    updateDisplay(number);
  } else {
    updateDisplay(displayText.textContent + number);
  }

  if (currentOperator !== null) {
    updateEquation(
      `${firstNumber} ${currentOperator} ${displayText.textContent}`
    );
  }
}

function updateDisplay(value) {
  displayText.textContent = value;
}

function updateEquation(text) {
  previousDisplay.textContent = text;
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
    setOperator(operator, btn);
  });
});

clearBtn.addEventListener("click", clear);

deleteBtn.addEventListener("click", deleteNum);

equalsBtn.addEventListener("click", () => {
  evaluate();
});

decimalBtn.addEventListener("click", addDecimal);

// KEYBOARD SHORTCUTS (Bonus!)

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    appendNumber(e.key);
  }
  if (["+", "-", "*", "/"].includes(e.key)) {
    setOperator(e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    evaluate();
    shouldResetDisplay = true;
  }
  if (e.key === "Escape") {
    clear();
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    deleteNum();
  }
  if (e.key === ".") {
    addDecimal();
  }
});
