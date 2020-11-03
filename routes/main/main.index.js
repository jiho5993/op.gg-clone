const router = require('express').Router();
const controller = require('./main.controller');

router.get('/', controller.main);

module.exports = router;