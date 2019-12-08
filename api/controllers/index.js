const UrlController = require("./url.controller")

module.exports = {
	getUrlController: function getUrlController() {
		return new UrlController();
    }
};
