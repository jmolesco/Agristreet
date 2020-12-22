const DbHelper = require('../dbhelper');

const inventorytrailCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventorytrail.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('inventorytrail.id', value));
    },
    inventorytrailEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventorytrail.name', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventorytrail.status', status));
    },
    inventoryIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventorytrail.inventoryid', value));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('inventorytrail.name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('inventorytrail.id');
      } else {
        baseCriteria.addOrderByDesc('inventorytrail.id');
      }
    },
    orderByInventoryTrail: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('inventorytrail.name');
      } else {
        baseCriteria.addOrderByDesc('inventorytrail.name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => inventorytrailCriteria();