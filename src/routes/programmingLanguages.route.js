const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

//create routers for each endpoint

/* POST user - create a new user  */
router.post('/add', usersController.createUser)


module.exports = router;
