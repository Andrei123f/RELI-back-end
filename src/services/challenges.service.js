require("dotenv").config();
const connectionString = process.env.ATLAS_URI;
const { MongoClient } = require("mongodb");

async function getAllByUsername(username) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("challenges");
    const challenges = await collection.find({
      username: username,
    });

    const cc = await formatChallenges(challenges);
    connector.close();
    return cc;
  } catch (err) {
    throw err;
  }
}

async function getAllDefault() {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("defaultChapters");
    const defaultChallenges = await collection.find({}).toArray();
    return defaultChallenges;
  } catch (err) {
    throw err;
  }
}

async function getDefaultById(defaultChallengeId) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("defaultChapters");
    const defaultChallenge = await collection.find({
      id: defaultChallengeId,
    });
    return defaultChallenge;
  } catch (err) {
    throw err;
  }
}

async function insertNewUserChapters(userDetails, chapters) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("challenges");
    await collection.insertOne({
      username: userDetails.username,
      chapters: chapters,
    });
    return true;
  } catch (err) {
    throw err;
  }
}

//TODO decide what statuses you are going to have for each challenge that will pe shown on the UI.
async function formatChallenges(challenges) {
  let formattedChallenges = [];

  await challenges.forEach(function (cc) {
    formattedChallenges.push({
      challenge_id: cc.challenge_id,
      other_value: cc.other_value,
    });
  });

  return formattedChallenges;
}

module.exports = {
  getAllByUsername,
  getAllDefault,
  getDefaultById,
  insertNewUserChapters,
};
