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
    connector.close();
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
    connector.close();
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
    connector.close();
    return true;
  } catch (err) {
    throw err;
  }
}

async function getChaptersByUsername(userDetails) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("challenges");
    const chapters = await collection.findOne({
      username: userDetails.username,
    });
    connector.close();
    return chapters;
  } catch (err) {
    throw err;
  }
}

async function updateChallengeById(
  chapter_id,
  challenge_id,
  userDetails,
  updateData
) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("challenges");
    await collection.updateOne(
      { username: userDetails.username },
      {
        $set: {
          "chapters.$[updateChapter].challenges.$[updateChallenge].completed":
            updateData.completed,
          "chapters.$[updateChapter].challenges.$[updateChallenge].C":
            updateData.C,
          "chapters.$[updateChapter].challenges.$[updateChallenge].p1":
            updateData.p1,
          "chapters.$[updateChapter].challenges.$[updateChallenge].p2":
            updateData.p2,
          "chapters.$[updateChapter].challenges.$[updateChallenge].user_answer":
            updateData.user_answer,
          "chapters.$[updateChapter].challenges.$[updateChallenge].tests_passed":
            updateData.tests_passed,
          "chapters.$[updateChapter].challenges.$[updateChallenge].tests_failed":
            updateData.tests_failed,
        },
      },
      {
        arrayFilters: [
          { "updateChapter.chapter_id": `chapter_${chapter_id}` },
          {
            "updateChallenge.challenge_id": `chapter_${chapter_id}_challenge_${challenge_id}`,
          },
        ],
      }
    );
    connector.close();

    return true;
  } catch (err) {
    throw err;
  }
}

async function updatePercOfChapter(chapter_id, userDetails, newP) {
  try {
    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("challenges");
    await collection.updateOne(
      { username: userDetails.username },
      {
        $set: {
          "chapters.$[updateChapter].perc_done": newP,
        },
      },
      {
        arrayFilters: [{ "updateChapter.chapter_id": `chapter_${chapter_id}` }],
      }
    );
    connector.close();
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
  getChaptersByUsername,
  updateChallengeById,
  updatePercOfChapter,
};
