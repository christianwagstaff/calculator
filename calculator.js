
function multiply(a,b) {return a * b};
function add(a,b) {return a + b;}
function subtract(a,b) {return a - b;}
function divide(a,b) {
    if (b === 0) return 'ERROR! World Ending!'
    return a / b;
} 

function operate(operator, num1, num2) {
    let operatorToCall = '';
    if (operator === 'add') {
        operatorToCall = add;
    } else if (operator === 'subtract') {
        operatorToCall = subtract;
    } else if (operator === 'multiply') {
        operatorToCall = multiply;
    } else if (operator === 'divide') {
        operatorToCall = divide;
    } else {
        operatorToCall = add;
    }
    let val =  operatorToCall(num1, num2);
    return val;
}

const display = document.getElementById('screen');
const digits = document.querySelectorAll('.digits');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const changeSignBtn = document.getElementById('changeSign');
const equalBtn = document.getElementById('equals');
const operators = document.querySelectorAll('.operator');

digits.forEach(e => e.addEventListener('click', addNumber));
operators.forEach( e => e.addEventListener('click', startCalculation));

clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', backspaceDisplay);
changeSignBtn.addEventListener('click', changeSign);
equalBtn.addEventListener('click', runCalcuation);

let screenNumber = 0;
let previousNumber = 0;
let currentOperator = '';
let screenClear = 'no';
const SCREENSIZE = 1000000;

function updateDisplayScreen(screenNumber) {
    display.textContent = Math.round(screenNumber * SCREENSIZE) / SCREENSIZE;
}
updateDisplayScreen(screenNumber);


//to get users number multiply the current number by 10 then add their selected digit
function addNumber(e) {
    clearBtn.textContent = 'C'
    let userSelection = e.target.textContent;
    if (screenClear === 'yes') {
        screenNumber = 0;
        screenClear = 'no';
    };
    if (screenNumber < 0) {
        screenNumber =  screenNumber * 10 - parseInt(userSelection);
    } else {
        screenNumber =  screenNumber * 10 + parseInt(userSelection);
    }
    updateDisplayScreen(screenNumber);
}

//clear the display
function clearDisplay() {
    clearBtn.textContent = "AC"
    screenNumber = 0;
    previousNumber = 0;
    currentOperator = '';
    screenClear = 'no';
    operators.forEach(e => e.classList.remove('current'))
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

//set screenNumber as userNumber1, resetDisplay
function startCalculation(e) {
    if (currentOperator === '') {
        let userOperator = e.target.id;
        currentOperator = userOperator;
        previousNumber = screenNumber;
        screenClear = 'yes';
        updateDisplayScreen(screenNumber);
    } else {
        operators.forEach(e1 => e1.classList.remove('current'));
        screenClear = 'yes';
        userOperator = e.target.id;
        previousNumber = operate(userOperator, previousNumber, screenNumber);
        screenNumber = previousNumber;
        updateDisplayScreen(screenNumber);
    }
    e.target.classList.add('current');
}

function runCalcuation() {
    screenNumber = operate(currentOperator, previousNumber, screenNumber)
    previousNumber = 0;
    currentOperator = '';
    screenClear = 'yes';
    updateDisplayScreen(screenNumber);
}