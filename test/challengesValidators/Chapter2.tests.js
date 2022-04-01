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

class Challenge2Test extends Chapter2 {
  //variables/functions available for this challenge only
  _challenge_title = "Function parameters";

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
  runTests() {
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 5;
    let isFunction = false;
    let correctNumberOfParameters = false;
    let r;

    //binding the class variables to the function variables so we can test

    let challengeMsg = "canCall should be defined and should be a function.";
    let s = this.parseReturnFunctionExistence("canCall");
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
      challengeMsg = "Function should have exactly one argument.";
      if (result.length == 1) {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
        correctNumberOfParameters = true;
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      if (correctNumberOfParameters) {
        r = result(12);
        challengeMsg = "You should be busy at 12.";
        if (r == "busy") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }

        r = result(15);
        challengeMsg = "You should be in lunch break at 15.";
        if (r == "lunch") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }

        r = result(18);
        challengeMsg = "You should be done at 18.";
        if (r == "done") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }
      }
    }
  }
  writeErrorLogical(actual) {
    switch (actual) {
      case undefined:
        return "has some logical issues";
      case "busy":
        return "said that you should be busy.";
      case "lunch":
        return "said that you should be in lunch break.";
      case "done":
        return "said that you should be done.";
    }
  }
}

class Challenge3Test extends Chapter2 {
  //variables/functions available for this challenge only
  _challenge_title = "Parameters computations";

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
  runTests() {
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 6;
    let isFunction = false;
    let correctNumberOfParameters = false;
    let r;

    //binding the class variables to the function variables so we can test

    let challengeMsg = "canCall should be defined and should be a function.";
    let s = this.parseReturnFunctionExistence("canCall");
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
      challengeMsg = "Function should have exactly 2 arguments.";
      if (result.length == 2) {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
        correctNumberOfParameters = true;
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      if (correctNumberOfParameters) {
        r = result(12, 1);
        challengeMsg = "You should be busy between 12 and 14.";
        if (r == "busy") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }

        r = result(15, 1);
        challengeMsg = "You should be in lunch break between 15 and 17.";
        if (r == "lunch") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }

        r = result(17, 1);
        challengeMsg = "You should be done between 17 and 19.";
        if (r == "done") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }

        r = result(10, 1);
        challengeMsg =
          "You should be able to talk outside the specified hours.";
        if (r == "talk") {
          this.pushTestPassed({
            msg: `${challengeMsg}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        } else {
          this.pushTestFailed({
            msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(r)}`,
            title: `${this._chapter_title}: ${this._challenge_title}`,
          });
        }
      }
    }
  }
  writeErrorLogical(actual) {
    switch (actual) {
      case undefined:
        return "has some logical issues";
      case "busy":
        return "said that you should be busy.";
      case "lunch":
        return "said that you should be in lunch break.";
      case "done":
        return "said that you should be done.";
      case "talk":
        return "said that you should be able to talk. ";
    }
  }
}

class Challenge4Test extends Chapter2 {}

class Challenge5Test extends Chapter2 {}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};