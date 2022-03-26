const d = require("./defaultTest");

class Challenge1 extends d.defaultTest {
  constructor(challenge, code, bindings) {
    super(1, challenge, code, bindings);
  }
}

class Challenge1Test extends Challenge1 {
  //variables available for this challenge only
  andrei = 10;

  //common functions
  constructor(code, bindings) {
    super(1, code, bindings);
  }
  setBindings() {
    Object.keys(this.bindings).forEach((key) => {
      this[key] = this.bindings[key];
    });
  }

  //common function, but customised tests
  runTests() {
      console.log(this.andrei);
  }
}

class Challenge2Test extends Challenge1 {}

class Challenge3Test extends Challenge1 {}

class Challenge4Test extends Challenge1 {}

class Challenge5Test extends Challenge1 {}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
