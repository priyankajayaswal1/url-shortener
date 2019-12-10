const crypto = require('crypto');
const logger = require('../utils/logger')
const UrlData = require('../model/url.model');

const UrlService = function UrlService() { };

UrlService.prototype.fetchLongUrl = function fetchLongUrl(hashId) {
	logger.info('Inside UrlService for org' + hashId);
	return UrlData.findOneAndUpdate({ 'short_url': hashId }, { $inc: { "visit_count": 1 } }).exec();
};

UrlService.prototype.createShortUrl = function createShortUrl(data) {
	const longUrl = data["longUrl"];
	const hashId = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_').replace(/\+/g, '-').substring(0, 6);
	logger.info("longUrl"+JSON.stringify({ 'short_url': hashId, 'long_url': longUrl }))
	logger.info("longUrl"+{ 'short_url': hashId, 'long_url': longUrl })
	var options = { upsert: true, new: true };
	return Promise.all([UrlData.findOneAndUpdate({ 'short_url': hashId, 'long_url': longUrl,  'visit_count': 1  },{ 'short_url': hashId, 'long_url': longUrl , "visit_count": 1  }, options)])
		.then(function(values) {
		logger.info(values);

		return Promise.resolve(hashId);
	}).catch(err => {

		return Promise.reject(err);
	});
};

module.exports = UrlService;