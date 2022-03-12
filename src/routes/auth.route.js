const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const default404 = require('./default404.routes');

//create routers for each endpoint

/* POST auth/refreshAccessToken - to refresh the access token */
router.post('/refreshAccessToken', authController.refreshAccessToken);

/* POST auth/validateAccessToken - to refresh the access token */
router.post('/validateAccessToken', authController.validateAccessToken);


//default 404 behaviour
default404(router)

module.exports = router;
