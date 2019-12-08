const express = require('express');
const Promise = require('bluebird');
var HttpStatus = require('http-status');
const mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;

const config = require('./config');
const logger = require('./utils/logger');
const redisClient = require('./utils/redis.connection');
const urlRoutes = require('./routes/url.routes');
const router = express.Router(); // eslint-disable-line new-cap

router.use(function (req, res, next) {
    logger.info(req, 'Start of request');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    next();
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount url-routes routes at /url
router.use('/url', urlRoutes);

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');

module.exports = router;
