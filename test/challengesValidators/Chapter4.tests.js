const d = require("./defaultTest");
class Chapter4 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 4: Classes and OOP";

  constructor(challenge, code, bindings) {
    super(4, challenge, code, bindings);
  }

  isClass_str(value) {
    return `typeof ${value} === "function" &&
      (/^\s*class[^\w]+/.test(${value}.toString()) ||
        (globalThis[${value}.name] === ${value} && /^[A-Z]/.test(${value}.name)))
    `;
  }
}

class Challenge1Test extends Chapter4 {
  _challenge_title = "Define a Class";

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
    this.testsN = 3;
    let isClass = false;

    //binding the class variables to the function variables so we can test
    let s = `function test(){${this.code}; return ${this.isClass_str(
      "Character"
    )}}; test();`;
    s = this.parseInfiniteLoopProtection(s);

    let challengeMsg = "Character should be defined and should be a Class.";
    let result = eval(s);
    if (result) {
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
      isClass = true;
    } else {
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }
    if (isClass) {
      let s2 = `function test(){${this.code}; let ob_test = new Character(); return ob_test}; test();`;
      s2 = this.parseInfiniteLoopProtection(s2);
      let result2 = eval(s2);

      challengeMsg = "Character should have the required properties.";
      if (result2 && "health_bar" in result2 && "weapon" in result2) {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
        isClass = true;
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }

      challengeMsg =
        "Character should have the expected values on its properties.";
      if (result2 && result2.health_bar == 100 && result2.weapon == "sword") {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
        isClass = true;
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }
    }
  }
}

class Challenge2Test extends Chapter4 {
  _challenge_title = "Instantiate Object from Class";

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
    let isClass = false;

    //binding the class variables to the function variables so we can test
    let s = `function test(){${this.code}; return ${this.isClass_str(
      "Character"
    )}}; test();`;
    s = this.parseInfiniteLoopProtection(s);

    let challengeMsg = "Character should be defined and should be a Class.";
    let result = eval(s);
    if (result) {
      this.pushTestPassed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
      isClass = true;
    } else {
      this.pushTestFailed({
        msg: `${challengeMsg}`,
        title: `${this._chapter_title}: ${this._challenge_title}`,
      });
    }
    if (isClass) {
      challengeMsg =
        "character1 and character2 should be defined and should be objects instantiated from the Character Class.";

      let s2 = `function test(){${this.code}; return  character1 && character2 && character1 instanceof Character && character2 instanceof Character}; test();`;
      s2 = this.parseInfiniteLoopProtection(s2);
      let result2 = eval(s2);
      if (result2) {
        this.pushTestPassed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
        isClass = true;
      } else {
        this.pushTestFailed({
          msg: `${challengeMsg}`,
          title: `${this._chapter_title}: ${this._challenge_title}`,
        });
      }
      let s3 = `function test(){${this.code}; return character1;}test()`;
      challengeMsg = "character1 should have the expected properties.";
      s3 = this.parseInfiniteLoopProtection(s3);
      let result3 = eval(s3);
      if (
        result3 &&
        "health_bar" in result3 &&
        "weapon" in result3 &&
        "name" in result3
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

      challengeMsg =
        "character1 should have the expected properties with the expected values.";
      if (
        result3 &&
        "health_bar" in result3 &&
        "weapon" in result3 &&
        "name" in result3 &&
        result3.health_bar == 100 &&
        result3.weapon == "sword" &&
        result3.name == "Robert"
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

      let s4 = `function test(){${this.code}; return character2;}test()`;
      challengeMsg = "character2 should have the expected properties.";
      s4 = this.parseInfiniteLoopProtection(s4);
      let result4 = eval(s4);

      if (
        result4 &&
        "health_bar" in result4 &&
        "weapon" in result4 &&
        "name" in result4
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

      challengeMsg =
        "character2 should have the expected properties with the expected values.";
      if (
        result4 &&
        "health_bar" in result4 &&
        "weapon" in result4 &&
        "name" in result4 &&
        result4.health_bar == 100 &&
        result4.weapon == "sword" &&
        result4.name == "Andrei"
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

class Challenge3Test extends Chapter4 {
  _challenge_title = "Getters & Setters";

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
  }
}

class Challenge4Test extends Chapter4 {
  _challenge_title = "Inheritance";

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
    this.testsN = 3;
  }
}

class Challenge5Test extends Chapter4 {
  _challenge_title = "Final Challenge";

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
    this.testsN = 6;
  }
}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
