const mresources = require('../message-resources');
const errorTypes = require('./ErrorTypes');

class SessionError extends Error {
  constructor(error) {
    super(errorTypes.SessionError);
    this.extensions = [error || mresources.E0000001];
  }
}

class ForbiddenError extends Error {
  constructor(error) {
    super(errorTypes.ForbiddenError);
    this.extensions = [error || mresources.E0000002];
  }
}

class InvalidAccess extends Error {
  constructor(error) {
    super(errorTypes.InvalidAccess);
    this.extensions = [error || mresources.E0000020];
  }
}

class InputError extends Error {
  constructor() {
    super(errorTypes.InputError);
    this.extensions = [];
    this.addFieldError = this.addFieldError.bind(this);
  }

  /**
   *
   * @param {String} key Field key
   * @param {Object} error Object contains { errorCode , errorMessage }
   */
  addFieldError(key, error) {
    if (error && key) {
      this.extensions.push({
        key,
        ...error,
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
      });
    }
  }

  hasFieldError(key) {
    return this.extensions.filter(error => error.key === key).length > 0;
  }

  hasError() {
    return this.extensions.length > 0;
  }

  removeError(key) {
    const indx = this.extensions.indexOf(key);
    if (indx !== -1) {
      this.extensions.splice(indx);
    }
  }
}

module.exports = {
  SessionError,
  InputError,
  ForbiddenError,
  InvalidAccess,
};
