const express = require('express');
const Promise = require('bluebird');
const logger = require('@capillarytech/arya').Logger.getLogger('aira');
const auth = require('@capillarytech/arya').AuthServiceSdk();
const config = require('./config');
var HttpStatus = require('http-status');
const makeRestApiCall = require('./utils/apiRequests.util').makeRestApiCall;
const apiOptionReturn = require('./utils/apiRequests.util').airaApiEngineOptionReturn;
const aryaApiOptionReturn = require('./utils/apiRequests.util').aryaApiOptionReturn;
const mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;
const errorManagement = require('./utils/globalErrorHandler');
const serviceMapper = require('@capillarytech/arya').ServiceFinder;
const airaDBParams = serviceMapper.getDbParams('aira_mongo');
const airaDBValues = serviceMapper.getDbServiceValues('aira_mongo');
const logoutRoutes = require('./routes/logout.route');
const loginRoutes = require('./routes/login.route');
const biReportsRoutes = require('./routes/biReports.route');
const orgRoutes = require('./routes/organization.route');
const ciRoutes = require('./routes/ci.route');
const realtimeRoutes = require('./routes/realtime.route');
const metaRoutes = require('./routes/meta.route');
const appInfoRoutes = require('./routes/appInfo.route');
const helpRoutes = require('./routes/help.route');
const notificationRoutes = require('./routes/notification.route');
const scheduleAPIRoutes = require('./routes/schedule.route');

var mongoUrl;

// Setting up mongo connection
if (process.env.NODE_ENV === 'production') {
    mongoUrl = 'mongodb://' + airaDBValues['host'] + ':27017/' + airaDBParams['dbase'];
} else {
    mongoUrl = 'mongodb://127.0.0.1:27017/aira_mongo';
}
logger.info('Connecting to MongoDB', mongoUrl);
var options = {
    socketOptions: {
        autoReconnect: true
    },
    reconnectTries: 500,
    reconnectInterval: 5000
};
mongoose.connect(mongoUrl, options);

//setting rabbitMQ
var RabbitMQ = require('./utils/rabbitMQReceiver');
var rabbitMQ = new RabbitMQ;
RabbitMQ.getConnection('notification_communicator');

const router = express.Router(); // eslint-disable-line new-cap

router.use(function (req, res, next) {
    logger.info(req, 'Start of request');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    next();
});

process.on('uncaughtException', function (error) {
    errorManagement.handler.handleError(error);
});

process.on('unhandledRejection', function (reason, p) {
    errorManagement.handler.handleError(reason);
});

var middleware = {
    disableRequests: function (req, res, next) {
        if (config.env === 'production') {
            logger.info('request disabled for prod env!!!');
            res.json({ message: 'Request Unsupported!' });
        }
        next();
    },
    validateHeaders: function (req, res, next) {
        logger.info('request headers are : ' + JSON.stringify(req.headers));
        logger.info('request params are : ' + JSON.stringify(req.params));
        if (!req.headers['x-cap-api-auth-org-id'] && !req.headers['X-CAP-API-AUTH-ORG-ID']) {
            res.status(HttpStatus.BAD_REQUEST).send({ 'message': 'required header x-cap-api-auth-org-id is missing' });
        } else if (!req.headers['x-cap-app-name'] && config.allowedApps.indexOf(req.headers['x-cap-app-name']) === -1) {
            res.status(HttpStatus.BAD_REQUEST).send({ 'message': 'required header x-cap-app-name is missing' });
        }
        next();
    },
    addHeadersForAiraApiEngine: function (req, res, next) {
        logger.info('Inside AiraApiEngineMiddleware with url:', req.originalUrl);
        var headers = req.headers;
        headers['orgId'] = req.orgId;
        headers['userId'] = req.userId;
	    var userDetails =  req.userDetails;
        userDetails['proxyOrgList'] = null;
        headers['userDetails'] = JSON.stringify(userDetails);
        headers['userRoleType'] = req.userRoleType;
        headers['accessibleEntities'] = JSON.stringify(req.userDetails.aryaUserRoles);
        return makeRestApiCall(apiOptionReturn(headers,
            req.originalUrl.substring(req.originalUrl.lastIndexOf("v1")), req.method, JSON.stringify(req.body)))
            .then((data) => {
                res.status(HttpStatus.OK).json(data);
            }).catch((err) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        next();
    },

    addHeadersForAiraApiEngineV2: function (req, res, next) {
        logger.info('Inside AiraApiEngineMiddleware with url:', req.originalUrl);
        var headers = req.headers;
        headers['orgId'] = req.orgId;
        headers['userId'] = req.userId;
	    var userDetails =  req.userDetails;
        userDetails['proxyOrgList'] = null;
        headers['userDetails'] = JSON.stringify(userDetails);
        headers['userRoleType'] = req.userRoleType;
        headers['accessibleEntities'] = JSON.stringify(req.userDetails.aryaUserRoles);
        return makeRestApiCall(apiOptionReturn(headers,
            req.originalUrl.substring(req.originalUrl.lastIndexOf("v2")), req.method, JSON.stringify(req.body)))
            .then((data) => {
                res.status(HttpStatus.OK).json(data);
            }).catch((err) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        next();
    },

    responseForQA: function (req, res, next) {
        var options = {};
        options["headers"] =  req.headers,
        options["method"] =  req.body["method"];
        options["url"] = req.body["url"];
        if (req.body["method"] === "POST"){
            options["body"] =req.body["body"]
        }
       delete options["headers"]["content-length"];
        options["resolveWithFullResponse"] = true;
        return makeRestApiCall(options)
            .then((data) => {
                res.status(HttpStatus.OK).json(data);
            }).catch((err) => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            });
        next();
    },

    authenticate: auth.authenticate(),
}

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount org-routes routes at /org

router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/appinfo', appInfoRoutes);
router.use('/help', helpRoutes);
router.use('/notifications', [middleware.validateHeaders, middleware.authenticate], notificationRoutes);
router.use('/schedule', scheduleAPIRoutes);
router.use('/bi', [middleware.validateHeaders, middleware.authenticate], biReportsRoutes);
router.use('/ci', [middleware.validateHeaders, middleware.authenticate], ciRoutes);
router.use('/org', [middleware.validateHeaders, middleware.authenticate], orgRoutes);
router.use('/realtime', [middleware.validateHeaders, middleware.authenticate], realtimeRoutes);
router.use('/meta', [middleware.validateHeaders, middleware.authenticate], metaRoutes);
router.use('/v1/*', [middleware.validateHeaders, middleware.authenticate, middleware.addHeadersForAiraApiEngine]);
router.use('/v2/*', [middleware.validateHeaders, middleware.authenticate, middleware.addHeadersForAiraApiEngineV2]);
router.use('/qa/*', [ middleware.validateHeaders, middleware.authenticate, middleware.responseForQA ]);

//adding raygunClient middleware
router.use(errorManagement.raygunClient.expressHandler);

module.exports = router;
