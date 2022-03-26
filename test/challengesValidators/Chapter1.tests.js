const d = require("./defaultTest");
class Challenge1 extends d.defaultTest {
  constructor(challenge, code, bindings) {
    super(1, challenge, code, bindings);
  }
}

class Challenge1Test extends Challenge1 {
  //variables/functions available for this challenge only
  _haveLove = true;
  _happy(){
    return true;
  }
  
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
    //binding the class variables to the function variables so we can test
    let haveLove = this._haveLove;
    let happy = () => this._happy();

    let title = "Chapter 1 Challenge 1"; 
    let p1 = "You should be happy if you have love";
    let p2 = "You should not be happy if you do not have love";

    //havelove is true
    let result = eval(this.code);
    if(result == true){
      console.log("test passed! " + p1)
    } else{
      console.log("test failed! " + p1);
    }

    //haveLove is false
    haveLove = false;
    result = eval(this.code);
    if(result == true){
      console.log("test failed!" + p2)
    } else{
      console.log("test passed!" + p2);
    }
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
