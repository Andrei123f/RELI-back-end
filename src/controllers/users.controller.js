require("dotenv").config();
const bcrypt = require("bcrypt");

const usersServices = require("../services/users.service");
const usersMiddleware = require("../middlewares/users.middleware");

async function createUser(req, res) {
  try {
    const validationResult = usersMiddleware.validateCreateUser(req.body);
    if (validationResult != true) {
      res.json(validationResult);
      return;
    }

    const user = await usersServices.get(req.body);
    if (user == null) {
      const result = await usersServices.create(req.body);
      if (result == true) {
        res.json({
          result: "SUCCESS",
          message: "User account created successfully.",
        });
        return;
      }
      res.json({
        result: "ERROR",
        essage:
          "Unexpected database error. We cannot process your request right now.",
      });
      return;
    }

    res.json({
      result: "ERROR",
      message: "The username already exists.",
    });
  } catch (err) {
    console.error(`Error while creating a user. Error message: `, err.message);
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

async function loginUser(req, res) {
  try {
    const validationResult = usersMiddleware.validateLoginUser(req.body);
    if (validationResult != true) {
      res.json(validationResult);
      return;
    }

    const user = await usersServices.get(req.body);
    if (user != null) {
      const result = bcrypt.compareSync(req.body.password, user.password);
      if (result == true) {
        res.json({
          result: "SUCCESS",
          message: "User successfully logged in.",
          userDetatails:{
            username: user.username,
            firstname: user.firstname,
            surname: user.surname,
            email: user.email
          },
          access_token: user.accessToken,
          refresh_token: user.refreshToken,
        });
      }
      return;
    }

    res.json({
      result: "ERROR",
      message: "User credentials are wrong. Invalid username or password.",
    });
  } catch (err) {
    console.error(`Error while loggin in a user. Error message: `, err.message);
    res.json({
      result: "ERROR",
      message:
        "Unexpected database error. We cannot process your request right now.",
    });
  }
}

module.exports = {
  createUser,
  loginUser,
};
