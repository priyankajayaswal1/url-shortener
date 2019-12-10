var util = require('util');
var BaseController = require('./base.controller');
const logger = require('../utils/logger')

const UrlService = require('../services').getUrlService();

var UrlController = function UrlController() {
	logger.info('Url Controller Initialized');
};

util.inherits(UrlController, BaseController);

UrlController.prototype.getLongUrl = function getLongUrl(req, res) {
	logger.info('Inside UrlController getLongUrl' + req.params.id);
	UrlService.fetchLongUrl(req.params.id)
		.then((data) => {
			if (data != null && data["long_url"] != null ){
				this.getRedirectResponse(res, data["long_url"]);
			}
			else
			{
				this.getErrorResponse(res, "Invalid code")
			}
		}).catch((err) => {
			this.getErrorResponse(res, err)
		});
};

UrlController.prototype.createShortUrl = function createShortUrl(req, res) {
	logger.info('Inside UrlController ');
	UrlService.createShortUrl(req.body)
		.then((data) => {
			this.getSuccessResponse(res, data);
		}).catch((err) => {
			this.getErrorResponse(res, err)
		});
};

module.exports = UrlController