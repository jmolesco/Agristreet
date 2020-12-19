
const validators = require('./validators');
const handlers = require('./handlers');
const mapper = require('./mapper');

module.exports = {
  ...handlers,
  ...mapper,
  ...validators,

};
