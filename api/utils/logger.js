
const winston = require('winston');
var appRoot = require('app-root-path');

var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  let logger = winston.createLogger({
    transports: [
      new (winston.transports.Console)(options.console),
      new (winston.transports.File)(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  logger.stream = {
    write: function(message) {
      logger.info(message);
    },
  };
  
module.exports = logger;