const syntaxValidator = require("esprima");
const stringComparison = require("string-comparison");
const fs = require('fs');

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
function detectSim(code, chapter_code, challenge_code) {
  try {
    //first get our solution code
    const path = __dirname + `/../configs/ChallengeSolutions/Chapter${chapter_code}/Challenge${challenge_code}.sol.js`;
    const ourSolCode = fs.readFileSync(path, 'utf-8');

    const ourSolAST = JSON.stringify(syntaxValidator.parseScript(ourSolCode));
    const userSolAST = JSON.stringify(syntaxValidator.parseScript(code));

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

  const ChapterTests = require(`../../test/challengesValidators/Chapter${chapter}.tests`);
  const ChallengeTests = new ChapterTests[`Challenge${challenge}Test`](code, bindings)

  ChallengeTests.setBindings();
  ChallengeTests.runTests();
}

module.exports = {
  validateSyntax,
  detectSim,
  unitTest,
};
