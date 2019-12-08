var BaseController = require('./base.controller');
var util = require('util');
const logger = require('@capillarytech/arya').Logger.getLogger('aira');
const AppInfoService = require('../services').getAppInfoService();

var AppInfoController = function AppInfoController() {
	logger.info('AppInfo Controller Initialized');
};

util.inherits(AppInfoController, BaseController);

AppInfoController.prototype.getInfo = function getInfo(req, res) {
	logger.info('Inside AppInfoController getInfo:', req.params);
	AppInfoService.requestPage(req.orgId, req.params.pageName)
		.then((data) => {
			res.json(this.getSuccessResponse('AppInfo', data[req.params.pageName]));
		}).catch((err) => {
			res.json(this.getErrorResponse(err))
		});
};
