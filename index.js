/* eslint-disable eqeqeq */
let displayedValue = '0';
let memory = '0';
let currentOperation = null;
let justEvaluated = false;
const display = document.querySelector('#display');

const add = (a, b) => +a + +b;
const subtract = (a, b) => +a - +b;
const multiply = (a, b) => +a * +b;
const divide = (a, b) => +a / +b;

function operate(operator, a, b) {
  let result = 0;

  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    default:
      return '😵';
  }

  // Dividing by zero will kill me
  if (result == Infinity) return '😵';

  if (result % 1 === 0) return result;

  return result.toFixed(2);
}

function updateDisplay(number, forceRefresh = false) {
  if (displayedValue === '0' || forceRefresh) {
    displayedValue = `${number}`;
  } else {
    displayedValue += number;
  }
  display.innerText = displayedValue;

  return displayedValue;
}

function evaluate() {
  // Handle divide by zero results
  if (memory === '😵' || displayedValue === '😵') reset();

  if (currentOperation !== null) {
    const result = operate(currentOperation, memory, displayedValue);
    updateDisplay(result, true);
  }

  memory = '0';
}

function reset() {
  updateDisplay(0, true);
  memory = '0';
  currentOperation = null;
  justEvaluated = false;
}

function sendNumber(value) {
  if (currentOperation && memory === '0') {
    memory = displayedValue;
    updateDisplay(value, true);
  } else if (justEvaluated) {
    updateDisplay(value, true);
    justEvaluated = false;
  } else {
    updateDisplay(value);
  }
}

function sendEquals() {
  evaluate();
  currentOperation = null;
  justEvaluated = true;
}

function sendDecimal() {
  if (justEvaluated) justEvaluated = false;

  if (!displayedValue.includes('.')) {
    displayedValue += '.';
    display.innerText = displayedValue;
  }
}

function backspace() {
  if (justEvaluated) justEvaluated = false;

  let tempDisplay = '';
  if (displayedValue != 0) {
    tempDisplay = displayedValue.slice(0, -1);
  }

  tempDisplay = tempDisplay.length === 0 ? '0' : tempDisplay;

  displayedValue = tempDisplay;
  display.innerText = displayedValue;
}

function sendOperator(type) {
  if (currentOperation !== null) {
    evaluate();
  } else {
    memory = displayedValue;
    displayedValue = '0';
  }
  currentOperation = type;
  if (justEvaluated) justEvaluated = false;
}

document.querySelectorAll('.number').forEach((number) => {
  number.addEventListener('click', () => {
    const value = number.innerText;
    sendNumber(value);
  });
});

document.querySelectorAll('.operator').forEach((operator) => {
  const type = operator.innerText;
  operator.addEventListener('click', () => {
    sendOperator(type);
  });
});

document.querySelector('#equals').addEventListener('click', () => {
  sendEquals();
});

document.querySelector('#clear').addEventListener('click', reset);

document.querySelector('#decimal').addEventListener('click', () => {
  sendDecimal();
});

document.querySelector('#delete').addEventListener('click', backspace);

window.addEventListener('keydown', (event) => event.preventDefault());

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      sendNumber(key);
      break;
    case 'Enter':
    case '=':
      sendEquals();
      break;
    case 'Delete':
      reset();
      break;
    case 'Backspace':
      backspace();
      break;
    case '.':
      sendDecimal();
      break;
    case '/':
    case '+':
    case '-':
    case '*':
      sendOperator(key);
      break;
    default:
      break;
  }
});
