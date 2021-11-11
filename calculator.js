
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
const decimalBtn = document.getElementById('.');

digits.forEach(e => e.addEventListener('click', addNumber));
operators.forEach( e => e.addEventListener('click', startCalculation));

clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', backspaceDisplay);
changeSignBtn.addEventListener('click', changeSign);
equalBtn.addEventListener('click', runCalcuation);
decimalBtn.addEventListener('click', addDecimal);

//initalize variables
let screenNumber = 0;
let previousNumber = 0;
let currentNumber = 0;
let currentOperator = '';
let ranResults = false; //checks if the equal sign was used
let allowSignChange = true; //let users change the sign from positive to negative
let allowBackspace = true; //let user backspace their inputs, but not results
let changingOperator = true; //allows user to change operator before pressing a number
let waitingForDecimal = false; //waits for next digit to add decimal
const SCREENSIZE = 10000000;

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
    screenNumber = roundAccurately(screenNumber);
    display.textContent = Math.round(screenNumber * SCREENSIZE) / SCREENSIZE;
}
updateDisplayScreen(screenNumber);

//set currentNumber as screenNumber, if there is a previousNumber and operator, run the calculation
//set that number as the previousNumber and screenNumber and reset currentNumber and operator

//to change to allow keyboard input, change find userOperator to another funciton that will pick either keyboard or event.id then send those results though this function
function startCalculation(e) {
    let userOperator = e.target.id;
    if (currentOperator === '' && !ranResults) {
        previousNumber = screenNumber;
        screenNumber = 0;
        currentOperator = userOperator;
    } else if (currentOperator === '' || changingOperator) {
        currentOperator = userOperator;
    } else {
        currentNumber = screenNumber;
        result = operate(currentOperator, previousNumber, currentNumber);
        currentOperator = userOperator;
        previousNumber = result;
        screenNumber = 0;
        currentNumber = 0;
        ranResults = true;
        updateDisplayScreen(previousNumber);
    }
    operators.forEach(e1 => e1.classList.remove('current'));
    e.target.classList.add('current');
    changingOperator = true;
    allowBackspace = false;
    allowSignChange = false;
    waitingForDecimal = false;
}


//to get users number multiply the current number by 10 then add their selected digit
function addNumber(e) {
    clearBtn.textContent = 'C'
    let userSelection = e.target.textContent;
    changingOperator = false;
    allowBackspace = true;
    allowSignChange = true;

    // TODO for decimals, check how many places behind 0 and multiply the user selection by 0.x1
    if (waitingForDecimal) {
        let screenNumberString = screenNumber.toString();
        if (!screenNumberString.includes('.')) {
            screenNumberString += '.';
        }
        screenNumberString += userSelection.toString();
        screenNumber = parseFloat(screenNumberString);
        updateDisplayScreen(screenNumber);
        return;
    }
    if (screenNumber < 0) {
        screenNumber =  screenNumber * 10 - parseInt(userSelection);
    } else {
        screenNumber =  screenNumber * 10 + parseInt(userSelection);
    }
    updateDisplayScreen(screenNumber);
}

//clear the display
function clearDisplay() {
    if (clearBtn.textContent === 'C') {
        clearBtn.textContent = 'AC';
    } else {
        previousNumber = 0;
        currentNumber = 0;
        ranResults = false;
        changingOperator = true;
        allowBackspace = true;
        clearOperators();   
    }
    screenNumber = 0;
    updateDisplayScreen(screenNumber);
    waitingForDecimal = false;
}

//backspace the display one space
function backspaceDisplay() {
    if (!allowBackspace) return;
    if (display.textContent !== 0 && screenNumber === 0) {
        screenNumber = display.textContent
    }

    // if its a decimal, convert to string, take off the last char and convert back to decimal
    if (waitingForDecimal) {
        let screenNumberString = screenNumber.toString();
        screenNumberString = screenNumberString.substr(0, screenNumberString.length - 1);
        screenNumber = parseFloat(screenNumberString);
        updateDisplayScreen(screenNumber);
        return;
    }
    if (screenNumber < 0) {
        screenNumber = Math.ceil(screenNumber / 10);
    } else {
        screenNumber = Math.floor(screenNumber / 10);
    }
    updateDisplayScreen(screenNumber);
}

//convert the number from negative to positive
function changeSign() {
    if (!allowSignChange) return; //can't change sign if flag is turned off
    if (!screenNumberEqualsDisplay()) {
        screenNumber = display.textContent;
        ranResults = false;
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
    ranResults = true;
    updateDisplayScreen(result);
    clearOperators();
    changingOperator = true;
    allowBackspace = false;
    allowSignChange = true;
    waitingForDecimal = false;
}

function clearOperators() {
    currentOperator = '';
    operators.forEach(e1 => e1.classList.remove('current'));
}

function addDecimal() {
    //if just calculated, reset calculator and start with 0.xxx
    //else add in decial to current screen number
    if (ranResults) {
        clearDisplay();
    } 
    waitingForDecimal = true;
    console.log('waiting for decimal');
}

function checkIfDecimal(screenNumber) {
    let wholeNumber = Math.floor(screenNumber);
    let remainder = screenNumber - wholeNumber;
    return remainder !== 0;
}

function screenNumberEqualsDisplay() {
    return display.textContent === screenNumber
}

function roundAccurately(num) {
    return parseFloat(Math.round(num + 'e' + 15) + 'e-' + 15);
}