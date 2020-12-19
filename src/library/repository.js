/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _category = require('./DB/category/repository');
function Repository(connection, _lang) {
  const categoryRepository = _category(connection);

  return {
    categoryRepository,
  };
}


module.exports = Repository;
