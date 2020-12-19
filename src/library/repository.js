/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _category = require('./DB/category/repository');
const _account = require('./DB/account/repository');
function Repository(connection, _lang) {
  const categoryRepository = _category(connection);
  const accountRepository = _account(connection);

  return {
    categoryRepository,
    accountRepository,
  };
}


module.exports = Repository;
