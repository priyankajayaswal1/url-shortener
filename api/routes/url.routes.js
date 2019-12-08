const express = require('express');
const router = express.Router();
const urlCtrl = require('../controllers').getUrlController();
const logger = require('../utils/logger')

router.get('/url', function (req, res, next) {
	logger.info('inside url route');
	urlCtrl.getInfo(req, res);
});

module.exports = router;
