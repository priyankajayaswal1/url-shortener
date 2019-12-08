const express = require('express');
const appInfoCtrl = require('../controllers').getAppInfoController();
const logger = require('@capillarytech/arya').Logger.getLogger('aira');
const router = express.Router();

router.get('/:pageName', function (req, res, next) {
	logger.info('inside appInfo route');
	appInfoCtrl.getInfo(req, res);
});

module.exports = router;
