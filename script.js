
const btn = document.querySelectorAll(".btn:not(.special):not(.slim)");
const keypad = document.querySelector(".keypad");
const main = keypad.querySelector(".main");

let result = document.querySelector(".result");
let expression = document.querySelector(".expression");

main.addEventListener("click", e => ButtonInput(e));
main.addEventListener("touch", e => ButtonInput(e));

let ButtonInput = (e) => {
    if(e.target.value === '=') {
        return equate();
    } else {
        expression.textContent += e.target.value;
    };
};

let equate = () => {
    if(expression.textContent.includes('=')) {
        console.log('foo');
    } else {
        result.textContent = calculator(expression.textContent);
        expression.textContent += '=';
    };
};

let clearAll = () => {
    expression.textContent = '';
    result.textContent = '';
};

let calculator = (eqn) => {
    const operands = [...eqn.match(/(\d+\.\d*)|\d+/g)];
    const operator = [...eqn.match(/\+|\-|÷|×/g)]; 
    
    const a = +operands[0];
    const b = +operands[1];
    
    switch (operator[0]) {
      case ('+'):
        result = a + b;
        break;
      case ('-'):
        result = a - b;
        break;
      case ('÷'):
        result = a / b;
        break;
      case ('×'):
        result = a * b;
        break;
    };
    return result % 1 != 0? result.toFixed(2):result; //only show decimals if the value is not rounded
  };