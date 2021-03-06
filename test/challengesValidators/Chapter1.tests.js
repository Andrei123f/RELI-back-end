const d = require("./defaultTest");
class Chapter1 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 1: Variables";

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
    s = this.parseInfiniteLoopProtection(s);
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
    this.code_test_str = this.parseDeclaredVariableExistence("buyFood");
    let s1 = this.parseDeclaredVariableExistence("haveFood");
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

    //if vars are already declared there is no point in running the code to crash the server
    if (!varsAlreadyDeclared) {
      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "buyFood",
        "this._buyFood()"
      );
      haveFood = true;
      let s2 = this.parseInsertVariableExistence("haveFood", haveFood);
      //buyFood should be true
      challengeMsg = "You should not buy food if you have food.";
      s2 = this.parseInfiniteLoopProtection(s2);
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
      s3 = this.parseInfiniteLoopProtection(s3);
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

class Challenge4Test extends Chapter1 {
  //variables/functions available for this challenge only
  _challenge_title = "Short-circuiting and Else";

  _callParents() {
    return "parents_called";
  }

  _goToSupermarket() {
    return "supermarket_gone";
  }

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
  runTests() {
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 4;
    let haveMoney;
    let tooFar;
    let varsAlreadyDeclared = false;

    let challengeMsg =
      "Variables haveMoney, tooFar, callParents and goToSupermarket should not be defined.";
    this.code_test_str = this.parseDeclaredVariableExistence("tooFar");
    this.code_test_str = this.parseDeclaredVariableExistence("haveMoney");
    this.code_test_str = this.parseDeclaredVariableExistence("callParents");
    let s1 = this.parseDeclaredVariableExistence("goToSupermarket");
    s1 = this.parseInfiniteLoopProtection(s1);
    //haveMoney, tooFar, callParents and goToSupermarket should be undefined
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

    //if vars are already declared there is no point in running the code to crash the server
    if (!varsAlreadyDeclared) {
      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "callParents",
        "this._callParents()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "goToSupermarket",
        "this._goToSupermarket()"
      );

      //have money is true and too far is true, so we need to call parents
      haveMoney = true;
      tooFar = true;
      this.code_test_str = this.parseInsertVariableExistence(
        "haveMoney",
        haveMoney
      );
      let s2 = this.parseInsertVariableExistence("tooFar", tooFar);

      //we should call our parents
      challengeMsg =
        "You should call your parents if you have money and the supermarket is too far.";
      s2 = this.parseInfiniteLoopProtection(s2);
      let result2 = eval(s2);
      if (result2 == "parents_called") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${
            result2 == undefined
              ? "has some logical issues."
              : "said that we should go to the supermarket"
          }`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "callParents",
        "this._callParents()"
      );
      this.code_test_str = this.parseInsertVariableExistence(
        "goToSupermarket",
        "this._goToSupermarket()"
      );

      //have money is true and too far is false, so we need go to the supermarket
      haveMoney = true;
      tooFar = false;
      this.code_test_str = this.parseInsertVariableExistence(
        "haveMoney",
        haveMoney
      );
      let s3 = this.parseInsertVariableExistence("tooFar", tooFar);
      //we should go to the supermarket
      challengeMsg =
        "You should go to the supermarket if you have money and the supermarket is not too far.";
      s3 = this.parseInfiniteLoopProtection(s3);

      let resul3 = eval(s3);
      if (resul3 == "supermarket_gone") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${
            resul3 == undefined
              ? "has some logical issues."
              : "said that we should call our parents."
          }`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "callParents",
        "this._callParents()"
      );
      this.code_test_str = this.parseInsertVariableExistence(
        "goToSupermarket",
        "this._goToSupermarket()"
      );
      //have money is false and too far is true, so we need to call parents
      haveMoney = false;
      tooFar = true;
      this.code_test_str = this.parseInsertVariableExistence(
        "haveMoney",
        haveMoney
      );
      let s4 = this.parseInsertVariableExistence("tooFar", tooFar);

      //we need to call parents
      challengeMsg =
        "You should call your parents if you do not have money and the supermarket is too far.";
      s4 = this.parseInfiniteLoopProtection(s4);

      let resul4 = eval(s4);
      if (resul4 == "parents_called") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${
            resul4 == undefined
              ? "has some logical issues."
              : "said that we should go to the supermarket."
          }`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }
    }
  }
}

class Challenge5Test extends Chapter1 {
  //variables/functions available for this challenge only
  _challenge_title = "Final Challenge";

  _supplier() {
    return "supplier_called";
  }

  _bankRupt() {
    return "bankrupt_gone";
  }

  _specialContract() {
    return "special_contract_made";
  }

  //common functions
  constructor(code, bindings) {
    super(5, code, bindings);
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

    let sportsCarNumber;
    let clientSports;

    let challengeMsg =
      "Variables sportsCarNumber, supplier, clientSports, specialContract and bankRupt should not be defined.";
    this.code_test_str = this.parseDeclaredVariableExistence("sportsCarNumber");
    this.code_test_str = this.parseDeclaredVariableExistence("supplier");
    this.code_test_str = this.parseDeclaredVariableExistence("clientSports");
    this.code_test_str = this.parseDeclaredVariableExistence("specialContract");
    let s1 = this.parseDeclaredVariableExistence("bankRupt");
    s1 = this.parseInfiniteLoopProtection(s1);

    //sportsCarNumber, supplier, clientSports, specialContract and bankRupt should be undefined
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

    //if vars are already declared there is no point in running the code to crash the server
    if (!varsAlreadyDeclared) {
      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "specialContract",
        "this._specialContract()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "supplier",
        "this._supplier()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "bankRupt",
        "this._bankRupt()"
      );

      //have money is true and too far is true, so we need to call parents
      sportsCarNumber = 0;
      clientSports = 1;

      this.sportsCarNumber = this.parseInsertVariableExistence(
        "sportsCarNumber",
        sportsCarNumber
      );
      let s2 = this.parseInsertVariableExistence("clientSports", clientSports);

      //we should call our parents
      challengeMsg =
        "You should make a special contract if you do not have any sports car and you have one customer that wants to buy one.";
      s2 = this.parseInfiniteLoopProtection(s2);

      let result2 = eval(s2);
      if (result2 == "special_contract_made") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(
            result2
          )}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "specialContract",
        "this._specialContract()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "supplier",
        "this._supplier()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "bankRupt",
        "this._bankRupt()"
      );

      //have money is true and too far is false, so we need go to the supermarket
      sportsCarNumber = 0;
      clientSports = 0;

      this.code_test_str = this.parseInsertVariableExistence(
        "sportsCarNumber",
        sportsCarNumber
      );
      let s3 = this.parseInsertVariableExistence("clientSports", clientSports);
      //we should go to the supermarket
      challengeMsg =
        "You should call the supplier if you do not have any sports car and no customrs wants to buy one.";

      s3 = this.parseInfiniteLoopProtection(s3);
      let result3 = eval(s3);
      if (result3 == "supplier_called") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(
            result3
          )}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      //now set the bindings
      this.code_test_str = "";
      this.code_test_str = this.parseInsertVariableExistence(
        "specialContract",
        "this._specialContract()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "supplier",
        "this._supplier()"
      );

      this.code_test_str = this.parseInsertVariableExistence(
        "bankRupt",
        "this._bankRupt()"
      );
      sportsCarNumber = 100;
      clientSports = 0;
      //have money is false and too far is true, so we need to call parents
      this.code_test_str = this.parseInsertVariableExistence(
        "sportsCarNumber",
        sportsCarNumber
      );
      let s4 = this.parseInsertVariableExistence("clientSports", clientSports);

      //we need to call parents
      challengeMsg =
        "You should go bankrupt if you have 100 sports cars and no client wants to buy one.";
      s4 = this.parseInfiniteLoopProtection(s4);

      let result4 = eval(s4);
      if (result4 == "bankrupt_gone") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg} Your soulution ${this.writeErrorLogical(
            result4
          )}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      let s5 = this.parseReturnVariableExistence("currCarNumber");
      s5 = `let sportsCarNumber, clientSports, specialContract, supplier, bankRupt; ${s5}`;
      //havelove is true
      s5 = this.parseInfiniteLoopProtection(s5);
      let result5 = eval(s5);

      challengeMsg = "You should 25 cars in your dealership right now.";
      if (result5 == 25) {
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

  writeErrorLogical(actual) {
    switch (actual) {
      case undefined:
        return "has some logical issues";
      case "supplier_called":
        return "said that we should call the supplier";
      case "bankrupt_gone":
        return "said that we should go bankrupt";
      case "special_contract_made":
        return "said that we should go make a special contract ";
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
