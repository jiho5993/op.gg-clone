const router = require('express').Router();
const controller = require('./summoner.controller');
const summonerMiddleware = require('../../middleware/summoner');

router.get('/user', summonerMiddleware, controller.user);

module.exports = router;