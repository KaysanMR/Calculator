





let calculator = (eqn) => {
    const operands = [...eqn.match(/(\d+\.\d*)|\d+/g)];
    const operator = [...eqn.match(/\+|\-|\/|\*/g)]; 
    
    const a = +operands[0];
    const b = +operands[1];
    
    switch (operator[0]) {
      case ('+'):
        result = a + b;
        break;
      case ('-'):
        result = a - b;
        break;
      case ('/'):
        result = a / b;
        break;
      case ('*'):
        result = a * b;
        break;
    };
    return result % 1 != 0? result.toFixed(2):result; //only show decimals if the value is not rounded
  };