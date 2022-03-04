require('dotenv').config();
const bcrypt = require('bcrypt');
const connectionString = process.env.ATLAS_URI;
const { MongoClient} = require('mongodb');


async function create(userData){
  try{
      const connector = await MongoClient.connect(connectionString);
      const db = connector.db("renderlingo");
      const collection = db.collection("users");
      const password = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS)));
      await collection.insertOne(
        {
          username: userData.username,
          firstname: userData.firstname,
          surname: userData.surname,
          email: userData.email,
          password: password
        }
      )
      connector.close();
      return {
           result: 'SUCCESS',
           message: 'User created successfully.'}
      }
      catch(err) {
      return {
        result: 'ERROR',
        message: 'Unexpected Database Error. We cannot process your request right now.'
      }   
  }        
}


async function get(userData){
  try{

    const connector = await MongoClient.connect(connectionString);
    const db = connector.db("renderlingo");
    const collection = db.collection("users");
    const user = await collection.findOne(
      {
        username: userData.username
      }
    );
    connector.close()

    return user;
    }
    catch(err) {
      return {
        result: 'ERROR',
        message: 'Unexpected Database Error. We cannot process your request right now.'
      }   
  }        
}

module.exports = {
  create,
  get
}
