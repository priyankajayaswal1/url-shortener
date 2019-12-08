const UrlService = function UrlService() { };
const logger = require('../utils/logger')

UrlService.prototype.requestPage = function requestPage(orgId, options) {
	logger.info('Inside UrlService for org', orgId, options);
	return "ok"//MongoOrganizationRepo.findOrgSpecificInfo(orgId, options);
};

module.exports = UrlService;