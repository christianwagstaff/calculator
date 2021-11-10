
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

//to get users number multiply the current number by 10 then add their selected digit
