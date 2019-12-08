"using strict";
const express = require('express')
var morgan = require('morgan');
var winston = require('winston');

const app = express()
const config = require("./config")
const port = 3000
const logger = require('./api/utils/logger');
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/' + config.prefix, require('./api'));
app.use(morgan('combined', { stream: winston.stream }));
app.listen(port, () => logger.info(`Example app listening on port ${port}!`))

module.exports = app;