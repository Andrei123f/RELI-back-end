const d = require("./defaultTest");
class Chapter2 extends d.defaultTest {
  //variables/functions available for this chapter only
  _chapter_title = "Chapter 2: Functions";

  constructor(challenge, code, bindings) {
    super(2, challenge, code, bindings);
  }
}

class Challenge1Test extends Chapter2 {

}

class Challenge2Test extends Chapter2 {

}

class Challenge3Test extends Chapter2 {
}

class Challenge4Test extends Chapter2 {

}

class Challenge5Test extends Chapter2 {
}

module.exports = {
  Challenge1Test,
  Challenge2Test,
  Challenge3Test,
  Challenge4Test,
  Challenge5Test,
};
