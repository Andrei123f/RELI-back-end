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

class Challenge4Test extends Chapter2 {
  _challenge_title = "For loop And While loop";

  //common functions
  constructor(code, bindings) {
    super(4, code, bindings);
  }

  _currSpeed = 0;

  _speed(increase) {
    this._currSpeed += increase;
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
    let varsAlreadyDeclared = false;
    let startingAltitude;

    let challengeMsg =
      "Variables startingAltitude and speed should not be defined.";
    this.code_test_str =
      this.parseDeclaredVariableExistence("startingAltitude");
    let s1 = `let speed = (i) => this._speed(i);  ${this.code_test_str}`;
    s1 = this.parseInfiniteLoopProtection(s1);
    //buyFood and haveFood should be undefined
    try {
      eval(s1);
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } catch (e) {
      varsAlreadyDeclared = true;
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }

    if (!varsAlreadyDeclared) {
      this._currSpeed = 0;
      //now set the bindings
      this.code_test_str = "";
      startingAltitude = 0;
      this.code_test_str = this.parseInsertVariableExistence(
        "startingAltitude",
        startingAltitude
      );
      let s2 = `let speed = (i) => this._speed(i);  ${this.code_test_str}`;
      s2 = this.parseInfiniteLoopProtection(s2);
      challengeMsg = "Speed has the expected value.";

      eval(s2);
      if (this._currSpeed == 70) {
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

class Challenge5Test extends Chapter2 {
  _challenge_title = "Final Challenge";

  //common functions
  constructor(code, bindings) {
    super(5, code, bindings);
  }

  _currSpeed = 0;

  _param_number = 0;

  _speed(increase) {
    this._currSpeed += increase;
  }

  _setNumbOfParams(f) {
    this._param_number = f.length;
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
    let varsAlreadyDeclared = false;
    let correctNumberOfParameters = false;
    let time;
    let isFunction = false;

    let challengeMsg = "Variable speed should not be defined.";
    let s1 = `let speed = (i) => this._speed(i);  ${this.code_test_str}`;
    s1 = this.parseInfiniteLoopProtection(s1);
    //buyFood and haveFood should be undefined
    try {
      eval(s1);
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } catch (e) {
      varsAlreadyDeclared = true;
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }

    challengeMsg = "takeOff should be defined and should be a function.";
    let s2 = this.parseReturnFunctionExistence("takeOff");
    //havelove is true
    s2 = this.parseInfiniteLoopProtection(s2);
    let result = eval(s2);

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
      challengeMsg = "takeOff should have 1 parameter";
      let s3 = `let speed = (i) => this._speed(i);  ${this.code} this._setNumbOfParams(takeOff)`;
      console.log(s3);
      eval(s3);
      if (this._param_number == 1) {
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
      if (correctNumberOfParameters && !varsAlreadyDeclared) {
        time = 10;
        //now run the usual tests.
        challengeMsg =
          "At any other time rather than 19 there should be plane checks.";
        let s4 = `function test(){let speed = (i) => this._speed(i);  ${this.code}}; return takeOff(${time})} test();`;
        console.log(s4);
        let result4 = eval(s4);
        if (result4 == "plane_checks") {
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

        //now bind the functions
        this._currSpeed = 0;
        this.code_test_str = "";
        time = 19;
        let s5 = `function test(){${this.code} return takeOff(${time})}; test();`;
        console.log(s5);
        s5 = `let speed = (i) => this._speed(i);  ${s5}`;
        s5 = this.parseInfiniteLoopProtection(s5);
        eval(s5);
        challengeMsg = "Speed has the expected value.";
        if (this._currSpeed == 90) {
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
}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
