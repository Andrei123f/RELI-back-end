require("dotenv").config();
const bcrypt = require("bcrypt");
const util = require("../utils/helper.util");
const connectionString = process.env.ATLAS_URI;
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

async function create(userData) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("users");
    const password = bcrypt.hashSync(
      userData.password,
      bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS))
    );
    const accessToken = jwt.sign(
      { username: userData.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXP_H }
    );
    const refreshToken = jwt.sign(
      { username: userData.username },
      process.env.REFERESH_TOKEN_SECERET,
      { expiresIn: process.env.REFRESH_TOKEN_EXP_M }
    );
    await collection.insertOne({
      username: userData.username,
      firstname: userData.firstname,
      surname: userData.surname,
      email: userData.email,
      password: password,
      refreshToken: {
        token_value: refreshToken,
        expires: util.getDateAfterMonths(1),
      },
      accessToken: {
        token_value: accessToken,
        expires: util.getDateAfterHours(1),
      },
    });
    return true;
  } catch (err) {
    throw err;
  }
}

async function get(userData) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("users");
    const user = await collection.findOne({
      username: userData.username,
    });

    connector.close();
    return user;
  } catch (err) {
    throw err;
  }
}

async function getByAccessToken(accessToken) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("users");
    const user = await collection.findOne({
      "accessToken.token_value": accessToken,
    });
    connector.close();
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  get,
  getByAccessToken,
};
