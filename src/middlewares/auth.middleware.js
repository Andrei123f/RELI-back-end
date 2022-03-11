require("dotenv").config();
const jwt = require("jsonwebtoken");

function getTokenFromReq(req) {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.split(" ")[1];
}

function validateAccessToken(token) {
  let res = true;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res = false;
  });

  return res;
}

function validateRefreshToken(token) {
  let res = true;
  jwt.verify(token, process.env.REFERESH_TOKEN_SECERET, (err, user) => {
    if (err) res = false;
  });

  return res;
}

function getRefreshToken(req) {
  return req.body.refresh_token ?? null;
}

module.exports = {
  getTokenFromReq,
  validateAccessToken,
  validateRefreshToken,
  getRefreshToken
};
