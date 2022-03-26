class defaultTest {
  chapter = "";
  challenge = null;
  code = "";
  bindings = {};
  percPass = 0;

  constructor(chapter, challenge, code, bindings) {
    this.chapter = chapter;
    this.challenge = challenge;
    this.code = code;
    this.bindings = bindings;
  }
}
module.exports = {
  defaultTest,
};
