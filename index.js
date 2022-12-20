let displayedValue = '0';
const display = document.querySelector('#display');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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

function updateDisplay(number) {
  // eslint-disable-next-line eqeqeq
  if (displayedValue == 0) {
    displayedValue = `${number}`;
  } else {
    displayedValue += number;
  }
  display.innerText = displayedValue;

  return displayedValue;
}

// document.querySelectorAll('.number').forEach((number) => {
//   number.addEventListener('click', () => {

//   })
// })
