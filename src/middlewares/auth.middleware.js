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
module.exports = {
  getTokenFromReq,
  validateAccessToken,
};
