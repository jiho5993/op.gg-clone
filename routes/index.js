const router = require('express').Router();
const main = require('./main/main.index');
const champion = require('./champion/champion.index');
const summoner = require('./summoner/summoner.index');

router.use('/', main);
router.use('/champion', champion);
router.use('/summoner', summoner);

module.exports = router;