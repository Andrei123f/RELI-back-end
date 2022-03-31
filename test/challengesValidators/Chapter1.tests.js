const d = require("./defaultTest");
class Chapter1 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Variables";

  constructor(challenge, code, bindings) {
    super(1, challenge, code, bindings);
  }
}

class Challenge1Test extends Chapter1 {
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
    let s = this.parseReturnVariableExistence("money");
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

class Challenge2Test extends Chapter1 {
  //variables/functions available for this challenge only
  _challenge_title = "Define a variable";

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
    this.testsN = 2;

    //binding the class variables to the function variables so we can test
    //let haveLove = this._haveLove;
    //let happy = () => this._happy();

    let challengeMsg = "Variable apples should be defined.";
    let s = this.parseReturnVariableExistence("apples");
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

    //check if we have at least 14 pounds
    if (result == 14) {
      challengeMsg = "The number of apples is correct";
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    } else {
      challengeMsg = "The number of apples is not correct";
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }
  }
}

class Challenge3Test extends Chapter1 {
  //variables/functions available for this challenge only
  _challenge_title = "If Statement";

  _buyFood() {
    return true;
  }

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
    this.testsN = 3;
    let haveFood;
    let varsAlreadyDeclared = false;

    let challengeMsg = "Variables buyFood and haveFood should not be defined.";
    let s1 = this.parseDeclaredVariableExistence("buyFood");
    s1 = this.parseDeclaredVariableExistence("haveFood");
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

    //now set the bindings
    this.code_test_str = "";
    this.code_test_str = this.parseInsertVariableExistence(
      "buyFood",
      "this._buyFood()"
    );
    haveFood = true;
    let s2 = this.parseInsertVariableExistence("haveFood", haveFood);

    //if vars are already declared there is no point in running the code to crash the server
    if (!varsAlreadyDeclared) {
      //buyFood should be true
      challengeMsg = "You should not buy food if you have food.";
      let result2 = eval(s2);
      if (result2 == undefined) {
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

      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "buyFood",
        "this._buyFood()"
      );
      haveFood = false;
      let s3 = this.parseInsertVariableExistence("haveFood", haveFood);

      //buyFood should be true
      challengeMsg = "You should buy food if you do not have food.";
      let resul3 = eval(s3);
      if (resul3 == true) {
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

class Challenge4Test extends Chapter1 {}

class Challenge5Test extends Chapter1 {}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
