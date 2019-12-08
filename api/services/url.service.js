const logger = require('@capillarytech/arya').Logger.getLogger('aira');
const BB = require('bluebird');
const MongoAppInfoRepo = require('../repos').getMongoAppInfoRepo();
const MongoOrganizationRepo = require('../repos').getMongoOrganizationRepo();

const AppInfoService = function AppInfoService() { };

AppInfoService.prototype.requestImage = function requestImage(options) {
	logger.info('Inside AppInfoService', options);
	return MongoAppInfoRepo.findAppInfo(options);
};

AppInfoService.prototype.requestPage = function requestPage(orgId, options) {
	logger.info('Inside AppInfoService for org', orgId, options);
	return MongoOrganizationRepo.findOrgSpecificInfo(orgId, options);
};

module.exports = AppInfoService;
