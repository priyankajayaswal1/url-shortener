const express = require('express');

const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;

const logger = require('./utils/logger');
const urlRoutes = require('./routes/url.routes');
const router = express.Router(); // eslint-disable-line new-cap

var mongoUrl = 'mongodb://heroku_cnrc7k8k:v57hhu39cln0fjij1aflpujlr1@ds215229.mlab.com:15229/heroku_cnrc7k8k';
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoUrl, options).then(()=>{
    logger.info('Connected to MongoDB');
});

router.use( (req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    next();
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount url-routes routes at /url
router.use('/url',  urlRoutes);

module.exports = router;