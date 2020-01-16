var HttpStatus = require('http-status');
const logger = require('../utils/logger')

// Base controller to normalise all api responses
var BaseController = function BaseController() {
	logger.info('base created');
};

BaseController.prototype.getSuccessResponse = function getSuccessResponse(res, body) {
	return res.json({"body":body});
};

BaseController.prototype.getErrorResponse = function getErrorResponse(res, error) {
	return res.json({"body":error});
};

BaseController.prototype.getRedirectResponse = function getRedirectResponse(res, longUrl) {
	return res.redirect( longUrl)
};

module.exports = BaseController;
