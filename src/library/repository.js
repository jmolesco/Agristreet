/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _category = require('./DB/category/repository');
const _account = require('./DB/account/repository');
const _farmer = require('./DB/farmer/repository');
const _farmerratingdetail = require('./DB/farmerratingdetail/repository');
const helpers = require('./helpers');

function Repository(connection, _lang) {
  const categoryRepository = _category(connection);
  const accountRepository = _account(connection);
  const farmerRepository = _farmer(connection);
  const farmerratingdetailRepository = _farmerratingdetail(connection);

  const MapGetDataList = data => ({
    ...data,
    intime: helpers.formatDateTimeToStringPH(data.intime),
    uptime: data.uptime ? helpers.formatDateTimeToStringPH(data.uptime) : 'null',
  });

  return {
    categoryRepository,
    accountRepository,
    farmerRepository,
    MapGetDataList,
    farmerratingdetailRepository
  };
}


module.exports = Repository;
