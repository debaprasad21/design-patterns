// Regular operations
class OldCalculator {
  constructor() {
    this.value = 0;
  }

  add(value) {
    this.value += value;
  }

  subtract(value) {
    this.value -= value;
  }

  multiply(value) {
    this.value *= value;
  }

  divide(value) {
    this.value /= value;
  }
}

const calculatorOld = new OldCalculator();
calculatorOld.add(10);
console.log(calculatorOld.value); // 10
calculatorOld.subtract(5);
console.log(calculatorOld.value); // 5
calculatorOld.multiply(2);
console.log(calculatorOld.value); // 10
calculatorOld.divide(2);
console.log(calculatorOld.value); // 5

/**
 *
 * Command Pattern - The idea of the command pattern is to take the different operations
 * that you want something to do and encapsulate them into individual commands that you to
 * perform and then and undo method, i.e., you can do the operation and you do the operation
 * and then undo the operation.
 * We can combine different commands together.
 * Scenario: save, exit and save and exit
 * */

// Command Pattern - The idea of the command pattern is to take the different operations

class Calculator {
  constructor() {
    this.value = 0;
    this.history = [];
  }

  executeCommand(command) {
    this.value = command.execute(this.value);
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    this.value = command.undo(this.value);
  }

  printHistory() {
    console.log(this.history);
  }
}

class AddCommand {
  constructor(valueToAdd) {
    this.valueToAdd = valueToAdd;
  }

  execute(currentValue) {
    return currentValue + this.valueToAdd;
  }

  undo(currentValue) {
    return currentValue - this.valueToAdd;
  }
}

class SubtractCommand {
  constructor(valueToSubtract) {
    this.valueToSubtract = valueToSubtract;
  }

  execute(currentValue) {
    return currentValue - this.valueToSubtract;
  }

  undo(currentValue) {
    return currentValue + this.valueToSubtract;
  }
}

class MultiplyCommand {
  constructor(valueToMultiply) {
    this.valueToMultiply = valueToMultiply;
  }

  execute(currentValue) {
    return currentValue * this.valueToMultiply;
  }

  undo(currentValue) {
    return currentValue / this.valueToMultiply;
  }
}

class DivideCommand {
  constructor(valueToDivide) {
    this.valueToDivide = valueToDivide;
  }

  execute(currentValue) {
    return currentValue / this.valueToDivide;
  }

  undo(currentValue) {
    return currentValue * this.valueToDivide;
  }
}

class AddThenMultiplyCommand {
  constructor(valueToAdd, valueToMultiply) {
    this.addCommand = new AddCommand(valueToAdd);
    this.multiplyCommand = new MultiplyCommand(valueToMultiply);
  }

  execute(currentValue) {
    const newValue = this.addCommand.execute(currentValue);
    return this.multiplyCommand.execute(newValue);
  }

  undo(currentValue) {
    const newValue = this.multiplyCommand.undo(currentValue);
    return this.addCommand.undo(newValue);
  }
}

const calculator = new Calculator();
console.log("----------------------------"); // 20
calculator.executeCommand(new AddCommand(10));
calculator.executeCommand(new MultiplyCommand(2));
calculator.printHistory();
console.log(calculator.value); // 20
calculator.undo();
console.log(calculator.value); // 10
calculator.undo();
console.log(calculator.value); // 0
calculator.printHistory();
calculator.executeCommand(new AddThenMultiplyCommand(10, 2));
console.log(calculator.value); // 20
calculator.undo();
console.log(calculator.value); // 0

// Function programming
function createCalculator() {
  let value = 0;
  const history = [];

  return {
    executeCommand(command) {
      value = command.execute(value);
      history.push(command);
    },
    undo() {
      const command = history.pop();
      value = command.undo(value);
    },
    printHistory() {
      console.log(history.map((cmd) => cmd.constructor.name));
    },
    getValue() {
      return value;
    },
  };
}

// AddCommand constructor function
function createAddCommand(valueToAdd) {
  return {
    execute(currentValue) {
      return currentValue + valueToAdd;
    },
    undo(currentValue) {
      return currentValue - valueToAdd;
    },
  };
}

// SubtractCommand constructor function
function createSubtractCommand(valueToSubtract) {
  return {
    execute(currentValue) {
      return currentValue - valueToSubtract;
    },
    undo(currentValue) {
      return currentValue + valueToSubtract;
    },
  };
}

// MultiplyCommand constructor function
function createMultiplyCommand(valueToMultiply) {
  return {
    execute(currentValue) {
      return currentValue * valueToMultiply;
    },
    undo(currentValue) {
      return currentValue / valueToMultiply;
    },
  };
}

// DivideCommand constructor function
function createDivideCommand(valueToDivide) {
  return {
    execute(currentValue) {
      return currentValue / valueToDivide;
    },
    undo(currentValue) {
      return currentValue * valueToDivide;
    },
  };
}

// AddThenMultiplyCommand constructor function
function createAddThenMultiplyCommand(valueToAdd, valueToMultiply) {
  const addCommand = createAddCommand(valueToAdd);
  const multiplyCommand = createMultiplyCommand(valueToMultiply);

  return {
    execute(currentValue) {
      const newValue = addCommand.execute(currentValue);
      return multiplyCommand.execute(newValue);
    },
    undo(currentValue) {
      const newValue = multiplyCommand.undo(currentValue);
      return addCommand.undo(newValue);
    },
  };
}

// Example usage
const calculatorFunc = createCalculator();
const addCommand = createAddCommand(10);
const subtractCommand = createSubtractCommand(5);
const multiplyCommand = createMultiplyCommand(2);
const divideCommand = createDivideCommand(2);

calculatorFunc.executeCommand(addCommand);
console.log("addCommand:", calculatorFunc.getValue());
calculatorFunc.executeCommand(subtractCommand);
console.log("subtractCommand:", calculatorFunc.getValue());
calculatorFunc.executeCommand(multiplyCommand);
console.log("multiplyCommand:", calculatorFunc.getValue());
calculatorFunc.executeCommand(divideCommand);

console.log("divideCommand:", calculatorFunc.getValue()); // Example of how to get the current value
calculatorFunc.undo();
console.log("After undo:", calculatorFunc.getValue()); // Value after undoing the last command
