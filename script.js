
const btn = document.querySelectorAll(".btn");
const keypad = document.querySelector(".keypad");

let result = document.querySelector(".result");
let expression = document.querySelector(".expression");

keypad.addEventListener("click", e => getInput(e));
keypad.addEventListener("touch", e => getInput(e));

const init = () => {
  expression.textContent = "";
  result.textContent = "";
  console.log("initialized");
};

const getInput = e => {
  switch(e.target.value) {
    case(void(0)): return;
    case("CLR"): return init();
    case("DEL"): return del();
    case("="): return showResult();
    default:
      expression.textContent += e.target.value;
      break;
  };  
};

const showResult = () => result.textContent = calculatinator(expression.textContent);

const del = () => {
  return expression.textContent = expression.textContent.slice(0,-1);
};

//super cool calculator code stuff

const regEx = {
  operands : /([-+]?)((\d+\.\d*)|\d+)/g,
  divide : /([-+]?)((\d+\.\d*)|\d+)[÷\/]([-+]?)((\d+\.\d*)|\d+)/g,
  multiply : /([-+]?)((\d+\.\d*)|\d+)[×\*]([-+]?)((\d+\.\d*)|\d+)/g,
};

const divideAll = eqn => {
  
  const divSplit = eqn => {
    operands = [...eqn.match(regEx.divide)]
    return operands;
  };
  
  const divide = eqn => {
    operands = [...eqn.match(regEx.operands)];
    let quotient = parseFloat(operands[0])/parseFloat(operands[1]);
    return quotient;
  };
  
  while (eqn.includes("÷") || eqn.includes("/")) {
    
    divSplit(eqn);
    operands.forEach(item => {
      eqn = eqn.replace(item, `+${divide(item)}`);
    });
    
  };
  
  return eqn;  
  
};

const multiplyAll = eqn => {
  
  const mulSplit = eqn => {
    operands = [...eqn.match(regEx.multiply)]
    return operands;
  };
  
  const multiply = eqn => {
    operands = [...eqn.match(regEx.operands)];
    let product = parseFloat(operands[0])*parseFloat(operands[1]);
    return product;
  };
  
  while (eqn.includes("×") || eqn.includes("*")) {
    
    mulSplit(eqn);
    operands.forEach(item => {
      eqn = eqn.replace(item, `+${multiply(item)}`);
    });
    
  };
  
  return eqn;  
  
};

const sumAll = eqn => {
  
  const operands = [...eqn.match(regEx.operands)];

  let sum = 0;
  operands.forEach(item => sum += parseFloat(item));
  return sum;
  
};

const calculatinator = eqn => {
  out = sumAll(multiplyAll(divideAll(eqn)));
  return out % 1 != 0? out.toFixed(2):out; //only show decimals if the value is not rounded
};
 
init();
