const d = require("./defaultTest");
class Chapter2 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 2: Functions";

  constructor(challenge, code, bindings) {
    super(2, challenge, code, bindings);
  }
}

class Challenge1Test extends Chapter2 {
  //variables/functions available for this challenge only
  _challenge_title = "Define a function";

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
    let isFunction = false;

    //binding the class variables to the function variables so we can test

    let challengeMsg =
      "availableFrom should be defined and should be a function.";
    let s = this.parseReturnFunctionExistence("availableFrom");
    //havelove is true
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
      isFunction = true;
    }
    if (isFunction) {
      challengeMsg = "You should be available from 14 every day.";
      if (result() == 14) {
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

class Challenge2Test extends Chapter2 {}

class Challenge3Test extends Chapter2 {}

class Challenge4Test extends Chapter2 {}

class Challenge5Test extends Chapter2 {}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
