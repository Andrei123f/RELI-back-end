require("dotenv").config();
const challengeServices = require("../services/challenges.service");
const usersServices = require("../services/users.service");
const challengesMiddleware = require("../middlewares/challenges.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const challengeValidator = require("../utils/validateChallenge.util");
async function getStats(req, res) {
  try {
    const token = authMiddleware.getTokenFromReq(req);
    if (token == null) {
      res.json({
        result: "ERROR",
        message: "Access token not present in the headers.",
      });
      return;
    }

    const result = authMiddleware.validateAccessToken(token);

    if (!result) {
      res.status(403).json({
        result: "ERROR",
        message: "Access token has expired or is not valid.",
      });
      return;
    }

    const user = await usersServices.getByAccessToken(token);

    if (!user) {
      res.json({
        result: "ERROR",
        message: "User could not be found by that access token.",
      });
      return;
    }

    const completedChallenges = await challengeServices.getAllByUsername(
      user.username
    );

    res.json({
      result: "SUCCESS",
      message:
        "Successfully retrieved the stats of the challenges done by the user",
      challengeStats: completedChallenges,
    });
  } catch (err) {
    console.error(
      `Error while getting the stats of the user. Error message: `,
      err.message
    );
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

async function evaluateSolution(req, res) {
  try {
    const token = authMiddleware.getTokenFromReq(req);
    if (token == null) {
      res.json({
        result: "ERROR",
        message: "Access token not present in the headers.",
      });
      return;
    }

    const resAccess = authMiddleware.validateAccessToken(token);

    if (!resAccess) {
      res.status(403).json({
        result: "ERROR",
        message: "Access token has expired or is not valid.",
      });

      return;
    }

    //check if we have all the fields present
    const resReq = challengesMiddleware.validateEvaluateSolution(req.body);

    if (resReq != true) {
      res.json({ resReq });
      return;
    }

    const chapter_code = req.body.chapter_code;
    const challenge_code = req.body.challenge_code;
    const code = req.body.code;
    const bindings = req.body.bindings;

    //do another syntax check
    const syntaxCheck = challengeValidator.validateSyntax(code);
    //if syntax is not valid, return error
    if (!syntaxCheck.result) {
      res.json({
        result: "ERROR",
        message: `Syntax error. Please check you code. ${syntaxCheck.errMsg}`,
      });
      return;
    }

    //calculate p1 that is the similarity between our solution and user's solution
    const simRes = challengeValidator.detectSim(
      code,
      chapter_code,
      challenge_code
    );

    if (!simRes.result) {
      res.json({
        result: "ERROR",
        message: "Something went wrong. Please try again.",
      });
      return;
    }

    const p1 = simRes.similarity;

    //now perform the unit tests on the code submitted by the user. this would be the p2
    //code, bindings, chapter, challenge
    const unitTestRes = challengeValidator.unitTest(
      code,
      bindings,
      chapter_code,
      challenge_code
    );

    res.json({
      result: "SUCCESS",
      message:
        "Successfully evaluated the solution. Percentange of correctness: 15%",
    });
  } catch (err) {
    console.error(
      `Error while evaluating the solution of the user. Error message: `,
      err.message
    );
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}
module.exports = {
  getStats,
  evaluateSolution,
};
