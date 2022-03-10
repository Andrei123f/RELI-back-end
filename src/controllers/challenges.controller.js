require("dotenv").config();
const challengeServices = require("../services/challenges.service");
const usersServices = require("../services/users.service");
const challengesMiddleware = require("../middlewares/challenges.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

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
      res.json({
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

    const completedChallenges = await challengeServices.getAllByUsername(user.username);

    res.json({
      result: "SUCCESS",
      message: "Successfully retrieved the stats of the challenges done by the user",
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

module.exports = {
  getStats,
};
