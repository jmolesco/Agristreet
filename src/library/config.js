const {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
  DEBUG,
} = process.env;

module.exports = {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
  DATE_FORMAT: 'MM-DD-YYYY', // refer to momentjs format, use on response
  DATE_FORMAT_PH: 'DD-MM-YYYY HH:MM A', // refer to momentjs format, use on response
  DATE_YEAR_MM_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'hh:mm A', // refer to momentjs format
  VALID_DATE_FORMAT: 'MM-DD-YYYY', // refer to momentjs format, use to validate request
  VALID_TIME_FORMAT: 'HH:mm', // refer to momentjs format, use to validate request
  DEBUG: JSON.parse(DEBUG),
  DEBUG_VERBOSE: true && JSON.parse(DEBUG),
  MAXLENGTH_TEXT:128,
  MAXCREDENTIAL_TEXT:12,
  MINCREDENTIAL_TEXT:8
};
