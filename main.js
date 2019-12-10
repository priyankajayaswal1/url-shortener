const express = require('express')
var morgan = require('morgan');
var winston = require('winston');
var bodyParser = require("body-parser");

const app = express()
const config = require("./config")
const port = 3000
const logger = require('./api/utils/logger');
app.use(morgan('combined', { stream: winston.stream.write }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/helloworld', (req, res) => {
  logger.info("hello something")
  logger.info('Hello World!'+ req.params)
  logger.info('Hello World!'+ req.body)
  logger.info('Hello World!'+ req.headers)
  
  res.send('Hello World!', req.query)
})

// dummy api
app.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    logger.info("User name = "+user_name+", password is "+password);
    res.end("yes");
});

app.use('/' , require('./api'));
app.listen(port, () => logger.info(`Example app listening on port ${port}!`))

module.exports = app;