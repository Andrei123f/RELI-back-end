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

    const chapters = await challengeServices.getAllByUsername(user.username);

    res.json({
      result: "SUCCESS",
      message:
        "Successfully retrieved the stats of the challenges done by the user",
      chaptersData: chapters,
    });
  } catch (err) {
    console.error(
      `Error while getting the stats of the user. Error message: `,
      err.message
    );
    console.log(err);
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
    const solution_shown = req.body.solution_shown;

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

    const p2 = unitTestRes.perc;
    const testFailedStack = unitTestRes.testFailedStack;
    const testPassedStack = unitTestRes.testPassedStack;

    //now calculate the correctness % of the answer(C) based on p1 and p2 as such
    //20% from p1 -> 0 -> 100
    //80% from p2 -> 0 -> 100
    //C -> 1 -> 100
    const C = (20 / 100) * p1 + (80 / 100) * p2;

    //if C > 80 then the answer is considered as correct
    const user = await usersServices.getByAccessToken(token);
    let chaptersData = await challengeServices.getChaptersByUsername(user);
    if (C > 80) {
      const challenge =
        chaptersData.chapters[chapter_code - 1].challenges[challenge_code - 1];

      //if the correctness is greater then update
      if (C >= challenge.C) {
        const resup = await challengeServices.updateChallengeById(
          chapter_code,
          challenge_code,
          user,
          {
            completed: true,
            C: C,
            p1: p1,
            p2: p2,
            user_answer: code,
            tests_passed: testPassedStack,
            tests_failed: testFailedStack,
            solution_shown: solution_shown
          }
        );

        if (resup) {
          //set the current challenge to completed
          chaptersData.chapters[chapter_code - 1].challenges[
            challenge_code - 1
          ].completed = true;
          //calculate the new percentage of the chapter
          let s = 0;
          for (const chalId in chaptersData.chapters[chapter_code - 1]
            .challenges) {
            s += chaptersData.chapters[chapter_code - 1].challenges[chalId]
              .completed
              ? 1
              : 0;
          }
          const newP =
            (s / chaptersData.chapters[chapter_code - 1].challenges.length) *
            100;
          const resupchap = await challengeServices.updatePercOfChapter(
            chapter_code,
            user,
            newP
          );
          if (resupchap) {
            res.json({
              result: "SUCCESS",
              message: `The answer is valid.`,
              chapter_code: chapter_code,
              challenge_code: challenge_code,
              C: C,
              p1: p1,
              p2: p2,
              testFailedStack: testFailedStack,
              testPassedStack: testPassedStack,
              solution_shown: solution_shown,
            });
            return;
          }
        }
      } else {
        res.json({
          result: "SUCCESS",
          message: `The answer is valid. But this challenge already has a better answer with a higher percentage of correctness: ${challenge.C}`,
          chapter_code: chapter_code,
          challenge_code: challenge_code,
          C: C,
          p1: p1,
          p2: p2,
          testFailedStack: testFailedStack,
          testPassedStack: testPassedStack,
        });
      }
    } else {
      await challengeServices.updateChallengeById(
        chapter_code,
        challenge_code,
        user,
        {
          completed: false,
          C: C,
          p1: p1,
          p2: p2,
          user_answer: code,
          tests_passed: testPassedStack,
          tests_failed: testFailedStack,
          solution_shown: solution_shown
        }
      );
      //set the current challenge to incomplete
      chaptersData.chapters[chapter_code - 1].challenges[
        challenge_code - 1
      ].completed = false;
      //calculate the new percentage of the chapter
      let s = 0;
      for (const chalId in chaptersData.chapters[chapter_code - 1].challenges) {
        s += chaptersData.chapters[chapter_code - 1].challenges[chalId]
          .completed
          ? 1
          : 0;
      }
      const newP =
        (s / chaptersData.chapters[chapter_code - 1].challenges.length) * 100;
      const resupchap = await challengeServices.updatePercOfChapter(
        chapter_code,
        user,
        newP
      );
      res.json({
        result: "ERROR",
        message:
          "The answer is not valid. The percentage of correctness must be at least 80%.",
        chapter_code: chapter_code,
        challenge_code: challenge_code,
        C: C,
        p1: p1,
        p2: p2,
        testFailedStack: testFailedStack,
        testPassedStack: testPassedStack,
      });
    }
  } catch (err) {
    console.error(
      `Error while evaluating the solution of the user. Error message: `
    );
    console.log(err);
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

async function getNextChallenge(req, res) {
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

    const chaptersData = await challengeServices.getChaptersByUsername(user);
    let chapter_id = 0;
    let challenge_id = 0;

    for (const chapterId in chaptersData.chapters) {
      if (chaptersData.chapters[chapterId].perc_done != 100) {
        chapter_id = parseInt(chapterId) + 1; //the loop starts from 0
        break;
      }
    }
    const chapterData = chaptersData.chapters[chapter_id - 1];
    //if the user has completed all chapters just return the last challenge from the last chapter
    if (chapter_id == 0) {
      res.json({
        result: "SUCCESS",
        chapter_id: chaptersData.chapters.length,
        challenge_id:
          chaptersData.chapters[chaptersData.chapters.length - 1].challenges
            .length,
        challengeDetails:
          chaptersData.chapters[chaptersData.chapters.length - 1].challenges[
            chaptersData.chapters[chaptersData.chapters.length - 1].challenges
              .length - 1
          ],
        chapterDetails: {
          chapter_id: chapterData.chapter_id,
          chapter_name: chapterData.chapter_name,
          chapter_description: chapterData.chapter_description,
          perc_done: chapterData.perc_done,
        },

        message:
          "User has completed all the chapters. No more chapters available.",
      });
      return;
    }

    for (const chalId in chaptersData.chapters[chapter_id - 1].challenges) {
      if (!chaptersData.chapters[chapter_id - 1].challenges[chalId].completed) {
        challenge_id = parseInt(chalId) + 1;
        break;
      }
    }
    const challengeData =
      chaptersData.chapters[chapter_id - 1].challenges[challenge_id - 1];
    res.json({
      result: "SUCCESS",
      chapter_id: chapter_id,
      challenge_id: challenge_id,
      challengeDetails: challengeData,
      chapterDetails: {
        chapter_id: chapterData.chapter_id,
        chapter_name: chapterData.chapter_name,
        chapter_description: chapterData.chapter_description,
        perc_done: chapterData.perc_done,
      },
      message: "Successfully retrieved the next challenge.",
    });
  } catch (err) {
    console.error(
      `Error while getting the the next challenge for the user. Error message: `,
      err.message
    );
    console.log(err);
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

async function getChallengeById(req, res) {
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

    //check if we have all the fields present
    const resReq = challengesMiddleware.validateGetById(req.body);

    if (resReq != true) {
      res.json({ resReq });
      return;
    }

    const chapter_id = req.body.chapter_code;
    const challenge_id = req.body.chapter_code;

    const chaptersData = await challengeServices.getChaptersByUsername(user);

    if (
      chaptersData.chapters[chapter_id - 1] &&
      chaptersData.chapters[chapter_id - 1].challenges[challenge_id - 1]
    ) {
      const challengeData =
        chaptersData.chapters[chapter_id - 1].challenges[challenge_id - 1] ??
        {};
      const chapterData = chaptersData.chapters[chapter_id - 1] ?? {};

      res.json({
        result: "SUCCESS",
        chapter_id: chapter_id,
        challenge_id: challenge_id,
        challengeDetails: challengeData,
        chapterDetails: {
          chapter_id: chapterData.chapter_id,
          chapter_name: chapterData.chapter_name,
          chapter_description: chapterData.chapter_description,
          perc_done: chapterData.perc_done,
        },
        message: "Successfully retrieved the challenge.",
      });
    } else {
      res.json({
        result: "ERROR",
        message: "Chapter id and/or challenge id are wrong.",
      });
    }
  } catch (err) {
    console.error(
      `Error while getting the the next challenge for the user. Error message: `,
      err.message
    );
    console.log(err);
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
  getNextChallenge,
  getChallengeById,
};
