const d = require("./defaultTest");
class Challenge1 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Variables";

  constructor(challenge, code, bindings) {
    super(1, challenge, code, bindings);
  }
}

class Challenge1Test extends Challenge1 {
  //variables/functions available for this challenge only
  _challenge_title = "Define a variable";

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

    //binding the class variables to the function variables so we can test
    //let haveLove = this._haveLove;
    //let happy = () => this._happy();

    let challengeMsg = "Variable money should be defined.";
    let s = this.parseVariableExistence("money");
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
    }

    //check if we have at least 50 pounds
    challengeMsg = "You should have 50 pounds in the wallet";
    if (result == 50) {
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
