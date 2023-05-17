
const btn = document.querySelectorAll(".btn");
const keypad = document.querySelector(".keypad");

let result = document.querySelector(".result");
let expression = document.querySelector(".expression");
let memory = "";

let a = 0;
let b = 0;
let operator = '+'

keypad.addEventListener("click", e => getInput(e));
keypad.addEventListener("touch", e => getInput(e));

const init = () => {
  expression.textContent = "";
  result.textContent = "0";
  memory = "";
  console.log("initialized");
};

const getInput = e => {
  switch(e.target.value) {
    case(void(0)): return;
    case("CLR"): return init();
    case("DEL"): return console.log('');
    default:
      operator? a += e.target.value : b += e.target.value; 
      a += e.target.value;
      if (/\+|\-|÷|×/g.test(e.target.value)) operator = e.target.value;
      break;
  };  
};

const splitInput = eqn => {
  operands = [...eqn.match(/(\d+\.\d*)|\d+/g)],
  operator = [...eqn.match(/\+|\-|÷|×/g)], 
  a = +operands[0],
  b = +operands[1];
  return;
};

const calculate = () => {

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
          
          
init();
