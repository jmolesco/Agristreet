/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */

const _category = require('./DB/category/repository');
const _account = require('./DB/account/repository');
const _farmer = require('./DB/farmer/repository');
const _farmerratingdetail = require('./DB/farmerratingdetail/repository');
const _product = require('./DB/product/repository');
const _inventory = require('./DB/inventory/repository');
const _inventorytrail = require('./DB/inventorydetail/repository');
const _farmerbanner = require('./DB/farmerbanner/repository');
const helpers = require('./helpers');
const { InventoryType } = require('./constants');

function Repository(connection, _lang) {
  const categoryRepository = _category(connection);
  const accountRepository = _account(connection);
  const farmerRepository = _farmer(connection);
  const farmerratingdetailRepository = _farmerratingdetail(connection);
  const productRepository = _product(connection);
  const inventoryRepository = _inventory(connection);
  const inventorytrailRepository = _inventorytrail(connection);
  const farmerbannerRepository = _farmerbanner(connection);

  const MapGetDataList = data => ({
    ...data,
    intime: helpers.formatDateTimeToStringPH(data.intime),
    uptime: data.uptime ? helpers.formatDateTimeToStringPH(data.uptime) : 'null',
  });
  const MapInventoryTrailDataList = data => ({
    ...data,
    typeName:InventoryType[data.type],//data.type===1?InventoryType.IN:data.type===2?InventoryType.OUT:InventoryType.REFUND,
    intime: helpers.formatDateTimeToStringPH(data.intime),
    uptime: data.uptime==="0000-00-00 00:00:00" ? "null":helpers.formatDateTimeToStringPH(data.uptime),
  });
  const MapListWithPager = (list, totalCount, pager, totalPerPage = 0) => ({
    ...list,
    intime: helpers.formatDateTimeToStringPH(list.intime),
    uptime: list.uptime ? helpers.formatDateTimeToStringPH(list.uptime) : 'null',
    pageInfo: pager && pager.page > 0 && pager.maxRecord > 0 ? {
      totalRecords: totalCount,
      totalPage: Math.ceil(totalCount / pager.maxRecord),
      currentPage: pager.page,
      totalPerPage,
    } : null,
  });

  return {
    categoryRepository,
    accountRepository,
    farmerRepository,
    MapGetDataList,
    farmerratingdetailRepository,
    productRepository,
    MapListWithPager,
    inventoryRepository,
    inventorytrailRepository,
    MapInventoryTrailDataList,
    farmerbannerRepository
  };
}


module.exports = Repository;
