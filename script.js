
const btn = document.querySelectorAll(".btn");
const keypad = document.querySelector(".keypad");

let result = document.querySelector(".result");
let expression = document.querySelector(".expression");
let error = "";

keypad.addEventListener("click", e => getInput(e));
keypad.addEventListener("touch", e => getInput(e));

const init = () => {
  console.clear();
  expression.textContent = "";
  result.textContent = "";
  error = "";
  console.log("initialized");
};

const getInput = e => {
  switch(e.target.value) {
    case(void(0)): return;
    case("CLR"): return init();
    case("DEL"): return del();
    case("="): return updateDisplay(calculatinator(expression.textContent));
    default:
      expression.textContent += e.target.value;
      break;
  };  
};

const updateDisplay = text => {
  result.textContent = text;
};

const del = () => {
  return expression.textContent = expression.textContent.slice(0,-1);
};

//super cool calculator code stuff

const regEx = {
  operands : /([-+]?)((\d+\.\d*)|\d+)/g,
  divide : /([-+]?)((\d+\.\d*)|\d+)[÷\/]([-+]?)((\d+\.\d*)|\d+)/g,
  multiply : /([-+]?)((\d+\.\d*)|\d+)[×\*]([-+]?)((\d+\.\d*)|\d+)/g,
  syntax : /[÷\/×\*]{2}/g,
  zero : /[÷\/]0+(?:\.?0*)?(?!\d)/,
  decimal : /[\.]{2}/g,

};

const checkError = eqn => {
  if ((regEx.syntax).test(eqn) || (regEx.decimal).test(eqn)) {
    error = "syntax";
    return true;
  } else if ((regEx.zero).test(eqn)) {
    error = "zero";
    return true;
  } else return false;
};

const errorMsg = error => {
  switch (error) {
    case ("syntax"):
      updateDisplay("SYNTAX ERROR");
    case ("zero"):
      updateDisplay("DIVISION ERROR");
    default:
      console.error("an error has occured!")
      updateDisplay("ERROR");
  };
};

const getOperands = (eqn,operation) => {
  switch (operation) {
    case ("div"): 
      operands = [...eqn.match(regEx.divide)];
      break;
    case ("mul"): 
      operands = [...eqn.match(regEx.multiply)];
      break;
    default:
      operands = [...eqn.match(regEx.operands)];
      break;
  };
};

const divideAll = eqn => {
  
  const divide = eqn => {
    operands = [...eqn.match(regEx.operands)];
    let quotient = parseFloat(operands[0])/parseFloat(operands[1]);
    return quotient;
  };
  
  while (eqn.includes("÷") || eqn.includes("/")) {
    
    getOperands(eqn,"div");
    operands.forEach(item => {
      eqn = eqn.replace(item, `+${divide(item)}`);
    });
    
  };
  
  return eqn;  
  
};

const multiplyAll = eqn => {
  
  const multiply = eqn => {
    operands = [...eqn.match(regEx.operands)];
    let product = parseFloat(operands[0])*parseFloat(operands[1]);
    return product;
  };
  
  while (eqn.includes("×") || eqn.includes("*")) {
    
    getOperands(eqn,"mul");
    operands.forEach(item => {
      eqn = eqn.replace(item, `+${multiply(item)}`);
    });
    
  };
  
  return eqn;  
  
};

const sumAll = eqn => {
  
  getOperands(eqn);

  let sum = 0;
  operands.forEach(item => sum += parseFloat(item));
  return sum;
  
};

const calculatinator = eqn => {
  if(checkError(eqn)){ 
    errorMsg(checkError());
  } else {
    out = sumAll(multiplyAll(divideAll(eqn)));
    return out % 1 != 0? out.toFixed(2):out; //only show decimals if the value is not rounded
  };
};
 
init();
