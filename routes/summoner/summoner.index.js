const router = require('express').Router();
const controller = require('./summoner.controller');

router.get('/user', controller.user);

module.exports = router;