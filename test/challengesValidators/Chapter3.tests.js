const d = require("./defaultTest");
class Chapter2 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 3: Arrays and Objects";

  constructor(challenge, code, bindings) {
    super(3, challenge, code, bindings);
  }
}

class Challenge1Test extends Chapter2 {
  _challenge_title = "Define an Array";

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
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 2;
    let isArray = false;
    let expectedValues = ["eggs", "bacon", "tomatoes", "spinach", "chicken"];
    let allValuesIncluded = false;

    //binding the class variables to the function variables so we can test

    let challengeMsg = "shoppingCart should be defined and should be an array.";
    let s = this.parseReturnArrayExistence("shoppingCart");
    //havelove is true
    s = this.parseInfiniteLoopProtection(s);
    let result = eval(s);

    //check if the variable is defined
    if (result === undefined) {
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } else {
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
      isArray = true;
    }
    if (isArray) {
      challengeMsg = "The shopping cart contains all the items.";

      for (const valId in expectedValues) {
        const expectedValue = expectedValues[valId];
        if (!result.includes(expectedValue)) {
          allValuesIncluded = false;
        }
      }

      if (!allValuesIncluded) {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }
    }
  }
}

class Challenge2Test extends Chapter2 {
  _challenge_title = "Loop & Change Array";

  //common functions
  constructor(code, bindings) {
    super(2, code, bindings);
  }

  setBindings() {
    Object.keys(this.bindings).forEach((key) => {
      this[key] = this.bindings[key];
    });
  }

  //common function, but customised tests
  runTests() {}
}

class Challenge3Test extends Chapter2 {
  _challenge_title = "Define an object";

  //common functions
  constructor(code, bindings) {
    super(3, code, bindings);
  }

  setBindings() {
    Object.keys(this.bindings).forEach((key) => {
      this[key] = this.bindings[key];
    });
  }

  //common function, but customised tests
  runTests() {}
}

class Challenge4Test extends Chapter2 {
  _challenge_title = "Modify an Object";

  //common functions
  constructor(code, bindings) {
    super(4, code, bindings);
  }

  setBindings() {
    Object.keys(this.bindings).forEach((key) => {
      this[key] = this.bindings[key];
    });
  }

  //common function, but customised tests
  runTests() {}
}

class Challenge5Test extends Chapter2 {
  _challenge_title = "Final Challenge";

  //common functions
  constructor(code, bindings) {
    super(5, code, bindings);
  }
  //common function, but customised tests
  runTests() {}
}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
