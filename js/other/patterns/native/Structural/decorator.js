// @ Пример 1. Декоратор для логирования

//* ООП
class Calculator {
  add(a, b) {
    return a + b;
  }
  substract(a, b) {
    return a - b;
  }
}

class LoggingDecorator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  add(a, b) {
    const result = this.calculator.add(a, b);
    console.log(`${a} + ${b} = ${result}`);
  }
  substract(a, b) {
    const result = this.calculator.substract(a, b);
    console.log(`${a} - ${b} = ${result}`);
  }
}

const basicCalculator = new Calculator();
const decoratedCalculator = new LoggingDecorator(basicCalculator);
const result1 = decoratedCalculator.add(3, 7);

//* ФП

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  a - b;
}

function loggingDecorator(func) {
  return function (...args) {
    const result = func(...args);
    console.log(`${func.name}: ${args.join(" and ")} = ${result} `);
    return result;
  };
}

const loggedAdd = loggingDecorator(add);
const addResult = loggedAdd(2, 5);
