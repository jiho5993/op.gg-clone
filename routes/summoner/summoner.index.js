const router = require('express').Router();
const controller = require('./summoner.controller');
const summonerMiddleware = require('../../middleware/summoner');
const matchListMiddleware = require('../../middleware/matchList');

router.get('/user', summonerMiddleware, matchListMiddleware, controller.user);
router.get('/match-info/:matchId', controller.matchInfo);

module.exports = router;