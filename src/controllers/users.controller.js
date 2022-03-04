require('dotenv').config();
const bcrypt = require('bcrypt');

const usersServices = require('../services/users.service');

async function createUser(req, res, next) {
    try {
      res.json(await usersServices.create(req.body));
    } catch (err) {
      console.error(`Error while creating a user`, err.message);
      next(err);
    }
}

async function loginUser(req, res, next) {
  try {
    const user = await usersServices.get(req.body);

    if(user != null){
      const result = bcrypt.compareSync(req.body.password, user.password);

      if(result == true) {
        res.json({
            result: 'SUCCESS',
            message: 'User successfully logged in.'
          }
        );
      }
      return;
    }

    res.json({
        result: 'ERROR',
        message: 'User credentials are wrong.'
      }
    );
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
}

  module.exports = {
    createUser,
    loginUser
  }
  