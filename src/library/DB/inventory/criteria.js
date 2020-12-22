const DbHelper = require('../dbhelper');

const inventoryCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventory.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('inventory.id', value));
    },
    inventoryEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventory.name', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('inventory.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('inventory.name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('inventory.id');
      } else {
        baseCriteria.addOrderByDesc('inventory.id');
      }
    },
    orderByInventory: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('inventory.name');
      } else {
        baseCriteria.addOrderByDesc('inventory.name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => inventoryCriteria();