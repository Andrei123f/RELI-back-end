const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

//create routers for each endpoint

/* POST user/add - create a new user  */
router.post('/add', usersController.createUser)

/* POST user/login - login a user  */
router.post('/login', usersController.loginUser)


module.exports = router;
