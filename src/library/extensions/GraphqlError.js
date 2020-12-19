const {
  InputError, SessionError, ForbiddenError, InvalidAccess,
} = require('./ErrorTypes');
const config = require('../config');

/**
 *
 * @param {Error} error Contains error info
 * @description Formats error return to client and add status code
 */
const errorFormatter = (error) => {
  let statusCode;
  let errorObj;
  switch (error.message) {
    case InputError: statusCode = 400; break;
    case SessionError: statusCode = 401; break;
    case ForbiddenError: statusCode = 403; break;
    case InvalidAccess: statusCode = 412; break;
    default: statusCode = 500;
  }
  if ([InputError, SessionError, ForbiddenError, InvalidAccess].indexOf(error.message) > -1) {
    errorObj = {
      statusCode,
      type: error.message,
      errorList: error.extensions,
      path: error.path,
    };
  } else {
    errorObj = {
      statusCode,
      message: error.message,
      locations: error.locations,
      stack: error.stack && config.DEBUG_VERBOSE ? error.stack.split('\n') : [],
      path: error.path,
    };
  }
  if (config.DEBUG) {
    // eslint-disable-next-line no-console
    console.log(errorObj);
  }
  return errorObj;
};

module.exports = errorFormatter;
