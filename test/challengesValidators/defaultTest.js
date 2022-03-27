class defaultTest {
  chapter = "";
  challenge = null;
  code = "";
  bindings = {};
  percPass = 0;
  testsN = 0;
  testsPassedN = 0;
  testsFailedN = 0;
  testsFailedStack = [];
  testsPassedStack = [];

  constructor(chapter, challenge, code, bindings) {
    this.chapter = chapter;
    this.challenge = challenge;
    this.code = code;
    this.bindings = bindings;
  }

  setPerc() {
    if(this.testsPassedN == 0){
      this.percPass = 0;
      return;
    };
    this.percPass = (this.testsN / this.testsPassedN) * 100;
  }

  //e: {msg: '', title: ''}
  pushTestFailed(e) {
    this.testsFailedN++;
    this.testsFailedStack.push(e);
  }

  //p: {msg: '', title: ''}
  pushTestPassed(p) {
    this.testsPassedN++;
    this.testsPassedStack.push(p);
  }

  //getters
  getPerc() {
    return this.percPass;
  }

  getTestFailedStack() {
    return this.testsFailedStack;
  }

  getTestPassedStack() {
    return this.testsPassedStack;
  }
}
module.exports = {
  defaultTest,
};
