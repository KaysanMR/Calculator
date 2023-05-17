
const btn = document.querySelectorAll(".btn");
const keypad = document.querySelector(".keypad");

let result = document.querySelector(".result");
let expression = document.querySelector(".expression");
let memory = "";

keypad.addEventListener("click", e => getInput(e));
keypad.addEventListener("touch", e => getInput(e));

const init = () => {
  expression.textContent =
   result.textContent =
    memory = "";
  console.log("initialized");
};

// let pressed = e => console.log(e.target);

const getInput = e => {
  switch(e.target.value) {
    case(void(0)): return;
    case("CLR"): return init();
    case("DEL"): return del();
    case("="): return console.log("=")
    default:
      expression.textContent += e.target.value
      break;
  };  
};

init();

const del = () => {
  expression.textContent = expression.textContent.substring(0, expression.textContent.length -1);
}

const calculator = (eqn) => {
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