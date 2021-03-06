const express = require('express');
const router = express.Router();
const challengesController = require('../controllers/challenges.controller');
const default404 = require('./default404.routes');

//create routers for each endpoint

/* GET challenge/getStats - to get all the data necessary for the graphs */
router.get('/getStats', challengesController.getStats);

/* POST challenge/evaluate - to get all the data necessary for the graphs */
router.post('/evaluate', challengesController.evaluateSolution);

/* GET challenge/getNextChallenge - to get the next unifinshed challenge */
router.get('/getNextChallenge', challengesController.getNextChallenge);

/* POST challenge/getChallengeById - to get a specific challenge by the chapter and challenge id. */
router.post('/getChallengeById', challengesController.getChallengeById);

//default 404 behaviour
default404(router)

module.exports = router;
