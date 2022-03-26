const syntaxValidator = require("esprima");
const stringComparison = require("string-comparison");

function validateSyntax(code) {
  try {
    syntaxValidator.parseScript(code);
    return { errMsg: null, result: true };
  } catch (e) {
    let errParts = e.message.split(":");
    return {
      errMsg: `Line: ${errParts[0]} Message: ${errParts[1]}`,
      result: false,
    };
  }
}

//util for detecting the similarity between our solution and user's solution
function detectSim(code, challenge_name) {
  try {
    const ourSolCode = "";
    const ourSolAST = syntaxValidator.parseScript(ourSolCode);
    const userSolAST = syntaxValidator.parseScript(code);

    //now run a couple of possible distance comparison algorithms and calculate an average

    //The Levenshtein distance
    const Levn = stringComparison.levenshtein;
    const LevnDResult = Levn.similarity(ourSolAST, userSolAST);

    //Longest Common Subsequence(LCS)
    const LCS = stringComparison.lcs;
    const LCSDResult = LCS.similarity(ourSolAST, userSolAST);

    //Metric Longest Common Subsequence(MLCS)
    const MLCS = stringComparison.mlcs;
    const MLCSResult = MLCS.similarity(ourSolAST, userSolAST);

    //Cosine similarity
    const Cosine = stringComparison.cosine;
    const CosineResult = Cosine.similarity(ourSolAST, userSolAST);

    let S = 0;

    //for now every one is equal :)

    S = (LevnDResult + LCSDResult + MLCSResult + CosineResult) / 4;

    return { similarity: S, result: true };
  } catch (e) {
    console.log(
      "Something went wrong while calcualting the similarities between our file and user's file... Error: "
    );
    console.log(e);
    return { similarity: 0, result: false };
  }
}

//util for performing unit tests on the user's solution
function unitTest(code, bindings, chapter, challenge) {
  code =
    'console.log("hello from the code"); console.log("This should show as 5: " +  this.bindings.andrei)';
  bindings = { andrei: 5 };

  let ValidatorTests = null;
  switch (chapter) {
    case 1:
      const Chapter1Tests = require("../../test/challengesValidators/Chapter1.tests");
      switch (challenge) {
        case 1:
          ValidatorTests = new Chapter1Tests.Challenge1Test(code, bindings);
          break;
        case 2:
          ValidatorTests = new Chapter1Tests.Challenge2Test(code, bindings);
          break;
        case 3:
          ValidatorTests = new Chapter1Tests.Challenge3Test(code, bindings);
          break;
        case 4:
          ValidatorTests = new Chapter1Tests.Challenge4Test(code, bindings);
          break;
        case 5:
          ValidatorTests = new Chapter1Tests.Challenge5Test(code, bindings);
          break;
      }
  }
  ValidatorTests.test();
}

module.exports = {
  validateSyntax,
  detectSim,
  unitTest,
};
