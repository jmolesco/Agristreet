
const winston = require('winston');
require('winston-daily-rotate-file');

const options = {
  file: new (winston.transports.DailyRotateFile)({
    level: 'info',
    filename: `${__dirname}/../../batch/logs/batch-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
  }),
  fileError: new (winston.transports.DailyRotateFile)({
    level: 'error',
    filename: `${__dirname}/../../batch/logs/batch_error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
  }),
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    options.file,
    options.fileError,
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

console.log(`Logs saved to ${__dirname}/../../batch/logs/batch.log`);

module.exports = logger;
