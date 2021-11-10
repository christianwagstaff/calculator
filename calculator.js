
function multiply(a,b) {return a * b};
function add(a,b) {return a + b;}
function subtract(a,b) {return a - b;}
function divide(a,b) {
    if (b === 0) return 'ERROR!'
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
        return 'Nothing Selected';
    }
    return operatorToCall(num1, num2);
}

const display = document.getElementById('screen');
const digits = document.querySelectorAll('.digit');
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
let currentNumber = 0;
let currentOperator = '';
let ranResults = 'no';
const SCREENSIZE = 100000000;

function updateDisplayScreen(screenNumber) {
    if (typeof(screenNumber) !== 'number') {
        display.textContent = screenNumber;
        return;
    }
    if (screenNumber > SCREENSIZE) {
        //TODO update fontsize, to shrink number and allow more digits instead of erroring
        clearDisplay();
        display.textContent = "OVERFLOW";
        return;
    }
    display.textContent = Math.round(screenNumber * SCREENSIZE) / SCREENSIZE;
}
updateDisplayScreen(screenNumber);

//set currentNumber as screenNumber, if there is a previousNumber and operator, run the calculation
//set that number as the previousNumber and screenNumber and reset currentNumber and operator

//to change to allow keyboard input, change find userOperator to another funciton that will pick either keyboard or event.id then send those results though this function
function startCalculation(e) {
    let userOperator = e.target.id;
    if (currentOperator === '' && ranResults === 'no') {
        previousNumber = screenNumber;
        screenNumber = 0;
        currentOperator = userOperator;
    } else if (currentOperator === '') {
        currentOperator = userOperator;
    } else {
        currentNumber = screenNumber;
        result = operate(currentOperator, previousNumber, currentNumber);
        currentOperator = userOperator;
        previousNumber = result;
        screenNumber = 0;
        currentNumber = 0;
        updateDisplayScreen(previousNumber);
    }
    operators.forEach(e1 => e1.classList.remove('current'));
    e.target.classList.add('current');
}


//to get users number multiply the current number by 10 then add their selected digit
function addNumber(e) {
    clearBtn.textContent = 'C'
    let userSelection = e.target.textContent;

    // TODO for decimals, check how many places behind 0 and multiply the user selection by 0.x1

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
    currentNumber = 0;
    ranResults = 'no';
    clearOperators();
    updateDisplayScreen(screenNumber);
}

//backspace the display one space
function backspaceDisplay() {
    if (display.textContent !== 0 && screenNumber === 0) {
        screenNumber = display.textContent
    }

    // TODO for decimals, multiply by 10 

    if (screenNumber < 0) {
        screenNumber = Math.ceil(screenNumber / 10);
    } else {
        screenNumber = Math.floor(screenNumber / 10);
    }
    updateDisplayScreen(screenNumber);
}

//convert the number from negative to positive
function changeSign() {
    if (display.textContent !== 0 && screenNumber === 0) {
        screenNumber = display.textContent
        ranResults = 'no';
    }
    screenNumber = 0 - screenNumber;
    updateDisplayScreen(screenNumber);
}

function runCalcuation() {
    if (currentOperator === '') return; //if user clicked enter without selecting an operand, do nothing
    let result = operate(currentOperator, previousNumber, screenNumber)
    if (typeof result !== 'number') {
        updateDisplayScreen(result)
        return;
    }
    previousNumber = result;
    currentNumber = 0
    screenNumber = 0;
    ranResults = 'yes';
    updateDisplayScreen(result);
    clearOperators();
}

function clearOperators() {
    currentOperator = '';
    operators.forEach(e1 => e1.classList.remove('current'));
}