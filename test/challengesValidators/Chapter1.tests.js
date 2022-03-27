const d = require("./defaultTest");
class Challenge1 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 1";

  constructor(challenge, code, bindings) {
    super(1, challenge, code, bindings);
  }
}

class Challenge1Test extends Challenge1 {
  //variables/functions available for this challenge only
  _haveLove = true;
  _happy() {
    return true;
  }
  _challenge_title = "Challenge 1";

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
    let haveLove = this._haveLove;
    let happy = () => this._happy();

    let challengeMsg = "You should be happy if you have love.";
    //havelove is true
    let result = eval(this.code);
    if (result == true) {
      this.pushTestPassed({
        msg: `${challengeMsg}: Passed!`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } else {
      this.pushTestFailed({
        msg: `${challengeMsg}: Failed!`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }

    challengeMsg = "You should not be happy if you do not have love.";
    //haveLove is false
    haveLove = false;
    result = eval(this.code);
    if (result == true) {
      this.pushTestFailed({
        msg: `${challengeMsg}: Failed!`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } else {
      this.pushTestPassed({
        msg: `${challengeMsg}: Passed!`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }

    // ... more tests...
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
