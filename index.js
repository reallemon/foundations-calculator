let displayedValue = '0';
let memory = '0';
let currentOperation = null;
const display = document.querySelector('#display');

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      console.error('Please use a valid operator');
  }
}

function updateDisplay(number, forceRefresh = false) {
  // eslint-disable-next-line eqeqeq
  if (displayedValue == 0 || forceRefresh) {
    displayedValue = `${number}`;
  } else {
    displayedValue += number;
  }
  display.innerText = displayedValue;

  return displayedValue;
}

function evaluate() {
  if (currentOperation !== null) {
    const result = operate(currentOperation, memory, displayedValue);
    updateDisplay(result, true);
  }

  memory = '0';
}

function reset() {
  updateDisplay(0, true);
  memory = 0;
  currentOperation = null;
}

document.querySelectorAll('.number').forEach((number) => {
  number.addEventListener('click', () => {
    const value = number.innerText;
    // eslint-disable-next-line eqeqeq
    if (currentOperation && memory == 0) {
      memory = displayedValue;
      updateDisplay(value, true);
    } else {
      updateDisplay(value);
    }
  });
});

document.querySelectorAll('.operator').forEach((operator) => {
  const type = operator.innerText;
  operator.addEventListener('click', () => {
    if (currentOperation !== null) {
      evaluate();
    } else {
      memory = displayedValue;
      displayedValue = '0';
    }
    currentOperation = type;
  });
});

document.querySelector('#equals').addEventListener('click', () => {
  evaluate();
  currentOperation = null;
});

document.querySelector('#clear').addEventListener('click', reset);
