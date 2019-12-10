const express = require('express');
const router = express.Router();
const urlCtrl = require('../controllers').getUrlController();
const logger = require('../utils/logger')

router.post('/', function (req, res, next) {
	logger.info('inside /url/ route req.method ');
	urlCtrl.createShortUrl(req, res);
});

router.get('/:id', function (req, res, next) {
	logger.info('inside /url/:id route');
	urlCtrl.getLongUrl(req, res);
});

// dummy post api
router.post('/login',(req, res) => function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});

module.exports = router;
