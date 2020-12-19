/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _AdminLogIn = require('./DB/AdminLogIn/repository');

function Repository(connection, _lang) {
  const AdminLogIn = _AdminLogIn(connection);


  return {
    AdminLogIn,
  };
}


module.exports = Repository;
