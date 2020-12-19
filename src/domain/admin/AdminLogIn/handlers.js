/* eslint-disable import/no-extraneous-dependencies */
const helpers = require('@Library/helpers');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleClientLogIn: DBTransact(async (connection, { clientLogInInput }) => ({
    token: '',
    tokenExpiration: 4,
  })),

};
