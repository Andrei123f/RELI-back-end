const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const default404 = require('./default404.routes');

//create routers for each endpoint

/* POST user/register - create a new user  */
router.post('/register', usersController.createUser)

/* POST user/login - login a user  */
router.post('/login', usersController.loginUser)


//default 404 behaviour
default404(router)

module.exports = router;
