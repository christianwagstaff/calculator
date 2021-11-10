
function multiply(a,b) {return a * b};
function add(a,b) {return a + b;}
function subtract(a,b) {return a - b;}
function divide(a,b) {
    if (b === 0) return 'ERROR! World Ending!'
    return a / b;
} 

function operate(operator, num1, num2) {
    let operatorToCall;
    if (operator === '+') {
        operatorToCall = add;
    } else if (operator === '-') {
        operatorToCall = subtract;
    } else if (operator === '*') {
        operatorToCall = multiply;
    } else if (operator === '/') {
        operatorToCall = divide;
    }
    return operatorToCall(num1, num2);
}

const display = document.getElementById('screen');
const digits = document.querySelectorAll('.digits');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const changeSignBtn = document.getElementById('changeSign');

digits.forEach(e => e.addEventListener('click', addNumber));
clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', backspaceDisplay);
changeSignBtn.addEventListener('click', changeSign);

let screenNumber = 0;
function updateDisplayScreen(screenNumber) {
    display.textContent = screenNumber;
}
updateDisplayScreen(screenNumber);


//to get users number multiply the current number by 10 then add their selected digit
function addNumber(e) {
    clearBtn.textContent = 'C'
    let userSelection = e.target.textContent;
    if (screenNumber < 0) {
        screenNumber =  screenNumber * 10 - parseInt(userSelection);
    } else {
        screenNumber =  screenNumber * 10 + parseInt(userSelection);
    }
    updateDisplayScreen(screenNumber);
}

//clear the display
function clearDisplay(e) {
    e.target.textContent = "AC"
    screenNumber = 0;
    updateDisplayScreen(screenNumber);
}

//backspace the display one space
function backspaceDisplay() {
    if (screenNumber < 0) {
        screenNumber = Math.ceil(screenNumber / 10);
    } else {
        screenNumber = Math.floor(screenNumber / 10);
    }
    updateDisplayScreen(screenNumber);
}

//convert the number from negative to positive
function changeSign() {
    screenNumber = 0 - screenNumber;
    updateDisplayScreen(screenNumber);
}