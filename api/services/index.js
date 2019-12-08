const UrlService = require("./url.service")

module.exports = {
	getUrlService: function getUrlService() {
		return new UrlService();
    }
};
