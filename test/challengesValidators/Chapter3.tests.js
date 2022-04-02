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
  runTests() {
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 3;
    let presentList = ["-1", "-1", "-1", "-1", "-1"];
    let notDefined = false;

    //binding the class variables to the function variables so we can test
    let challengeMsg = "Array presentList  and speed should not be defined.";
    let s1 = this.parseInsertArrayExistence("presentList", presentList);
    s1 = this.parseInfiniteLoopProtection(s1);
    //buyFood and haveFood should be undefined
    try {
      eval(s1);
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
      notDefined = true;
    } catch (e) {
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }

    if (notDefined) {
      //bind the variables
      this.code_test_str = "";
      let s2 = this.parseInsertArrayExistence("presentList", presentList);
      s2 = `function test(){${s2}; return Array.isArray(presentList) ? presentList : undefined;} test();`;
      s2 = this.parseInfiniteLoopProtection(s2);
      let result2 = eval(s2);

      challengeMsg = "The length of the present list should be 5.";
      if (result2.length == 5) {
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

      challengeMsg = "The present list should have correct values.";

      if (
        result2[0] == "pc" &&
        result2[1] == "-1" &&
        result2[2] == "baseball_hat" &&
        result2[3] == "-1" &&
        result2[4] == "new_phone"
      ) {
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
  runTests() {
    //number of tests - used for deciding the percentage of correctness
    this.testsN = 3;
    let isObject = false;
    let expectedProps = ["gpu", "cpu", "ram"];
    let allPropsIncluded = true;

    //binding the class variables to the function variables so we can test

    let challengeMsg = "config should be defined and should be an object.";
    let s = this.parseReturnObjectExistence("config");
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
      isObject = true;
    }
    if (isObject) {
      challengeMsg = "The config should have all the expected properties.";

      for (const expPropId in expectedProps) {
        const expectedProp = expectedProps[expPropId];
        if (!(expectedProp in result)) {
          allPropsIncluded = false;
        }
      }

      if (allPropsIncluded) {
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

      challengeMsg =
        "The config properties should have all the expected values.";

      if (
        result.gpu == "gtx" &&
        result.cpu == "intel" &&
        result.ram == "corsair"
      ) {
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
