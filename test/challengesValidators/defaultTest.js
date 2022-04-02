const protect = require("loop-protect");
const Babel = require("babel-standalone");
Babel.registerPlugin("loopProtection", protect(1000)); //default to 1 second
const transform = (source) =>
  Babel.transform(source, {
    plugins: ["loopProtection"],
  }).code;

class defaultTest {
  chapter = "";
  challenge = null;
  code = "";
  code_test_str = "";
  bindings = {};
  percPass = 0;
  testsN = 0;
  testsPassedN = 0;
  testsFailedN = 0;
  testsFailedStack = [];
  testsPassedStack = [];

  constructor(chapter, challenge, code, bindings) {
    this.chapter = chapter;
    this.challenge = challenge;
    this.code = code;
    this.bindings = bindings;
  }

  setPerc() {
    if (this.testsPassedN == 0) {
      this.percPass = 0;
      return;
    }
    this.percPass = (this.testsPassedN / this.testsN) * 100;
  }

  //function to run safely the eval
  parseInfiniteLoopProtection(code) {
    return transform(code);
  }

  //e: {msg: '', title: ''}
  pushTestFailed(e) {
    this.testsFailedN++;
    this.testsFailedStack.push(e);
  }

  //p: {msg: '', title: ''}
  pushTestPassed(p) {
    this.testsPassedN++;
    this.testsPassedStack.push(p);
  }

  //getters
  getPerc() {
    return this.percPass;
  }

  getTestFailedStack() {
    return this.testsFailedStack;
  }

  getTestPassedStack() {
    return this.testsPassedStack;
  }
  //tests
  //this checks if the code actually returns the variable that we want to return (basically checks if the user has declared a variable)
  parseReturnVariableExistence(var_name) {
    return `function test(){${this.code}; return typeof ${var_name} !== 'undefined' ? ${var_name} : undefined;} test();`;
  }

  //this checks if the code actually defines a function
  parseReturnFunctionExistence(var_name) {
    return `function test(){${this.code}; return typeof ${var_name} == 'function' ? ${var_name} : undefined;} test();`;
  }

  //this checks if the code actually defines an array
  parseReturnArrayExistence(var_name) {
    return `function test(){${this.code}; return Array.isArray(${var_name}) ? ${var_name} : undefined;} test();`;
  }

  //this checks if the code actually defines an object
  parseReturnObjectExistence(var_name) {
    return `function test(){${this.code}; return typeof ${var_name} == 'object' ? ${var_name} : undefined;} test();`;
  }
  
  //this checks if the code does not declare a variable that we do not want to be declared
  parseDeclaredVariableExistence(var_name) {
    if (this.code_test_str == "") {
      this.code_test_str = this.code;
    }
    return `let ${var_name}; ${this.code_test_str}`;
  }
  //this inserts the variables into the code
  parseInsertVariableExistence(var_name, var_bind) {
    if (this.code_test_str == "") {
      this.code_test_str = this.code;
    }
    return `let ${var_name} = ${var_bind}; ${this.code_test_str}`;
  }

  //this inserts the variables into the code
  parseInsertArrayExistence(var_name, var_bind) {
    if (this.code_test_str == "") {
      this.code_test_str = this.code;
    }
    return `let ${var_name} = [${var_bind}]; ${this.code_test_str}`;
  }
}
module.exports = {
  defaultTest,
};
