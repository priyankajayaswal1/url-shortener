var util = require('util');
var BaseController = require('./base.controller');
const logger = require('../utils/logger')

const UrlService = require('../services').getUrlService();

var UrlController = function UrlController() {
	logger.info('Url Controller Initialized');
};

util.inherits(UrlController, BaseController);

UrlController.prototype.getInfo = function getInfo(req, res) {
	logger.info('Inside UrlController getInfo:', req.params);
	UrlService.requestPage(req.orgId, req.params.pageName)
		.then((data) => {
			res.json(this.getSuccessResponse('Url', data[req.params.pageName]));
		}).catch((err) => {
			res.json(this.getErrorResponse(err))
		});
};

module.exports = UrlController