require("dotenv").config();
const usersServices = require("../services/users.service");
const authMiddleware = require("../middlewares/auth.middleware");

async function refreshAccessToken(req, res) {
  try {
    const token = authMiddleware.getTokenFromReq(req);
    if (token == null) {
      res.json({
        result: "ERROR",
        message: "Access token not present in the headers.",
      });
      return;
    }

    const refresh_token = authMiddleware.getRefreshToken(req);

    if (!refresh_token) {
      res.status(400).json({
        result: "ERROR",
        message: "Refresh token not present in the request body.",
      });
      return;
    }

    const result = authMiddleware.validateRefreshToken(refresh_token);

    if (!result) {
      res.status(403).json({
        result: "ERROR",
        message: "Refresh token has expired or is not valid.",
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

    if (user.refreshToken.token_value != refresh_token) {
      res.json({
        result: "ERROR",
        message:
          "Refresh token does not match the same user as the access token.",
      });
      return;
    }

    const access_token = await usersServices.refreshAccessToken(user.username);

    res.json({
      result: "SUCCESS",
      message: "Successfully refreshed the access token",
      access_token: access_token,
    });
  } catch (err) {
    console.error(
      `Error while refreshing the access token. Error message: `,
      err.message
    );
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

async function validateAccessToken(req, res) {
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

    res.json({
      result: "SUCCESS",
      message: "Access token is valid.",
    });
  } catch (err) {
    console.error(
      `Error while validating the access token. Error message: `,
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
  refreshAccessToken,
  validateAccessToken
};
