const crypto = require('crypto');
const logger = require('../utils/logger')
const UrlData = require('../model/url.model');

const UrlService = function UrlService() { };

UrlService.prototype.fetchLongUrl = function fetchLongUrl(hashId) {
	logger.info('Inside UrlService for org' + hashId);
	return UrlData.findOneAndUpdate({ 'short_url': hashId }, { $inc: { 'visit_count': 1 } }).exec();
};

UrlService.prototype.createShortUrl = function createShortUrl(data) {
	const longUrl = data["longUrl"];
	const  startIndex = 0, endIndex = 6;
	var options = { upsert: true, new: true };
	return getHashCode(longUrl, startIndex, endIndex)
	.then((hashId)=>{
		return Promise.all([UrlData.findOneAndUpdate({ 'short_url': hashId, 'long_url': longUrl,  'visit_count': 1  },{ 'short_url': hashId, 'long_url': longUrl , "visit_count": 1  }, options)])
		.then(function(values) {
			return Promise.resolve(hashId);
		})
	}).catch(err => {
		return Promise.reject(err);
	});
};

getHashCode = function getHashCode(longUrl, startIndex, endIndex){
	const hashId = crypto.createHash('md5').update(longUrl).digest('base64').replace(/\//g, '_').replace(/\+/g, '-').substring(startIndex, endIndex);
	logger.info("hashId"+hashId)
	return Promise.all([UrlData.find({ 'short_url': hashId })])
		.then( function(values) {
			if (values[0].length == 0 || (values[0].length > 0 && values[0][0]["long_url"] == longUrl)) {
				return Promise.resolve(hashId);
			}
			else
			{
				startIndex++;
				endIndex++;
				if (endIndex <= 18){
					return getHashCode(longUrl, startIndex, endIndex);
				}
			}
		}).catch((err)=>{
			return Promise.reject(err);
		});
}

module.exports = UrlService;