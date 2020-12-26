const DbHelper = require('../dbhelper');

const ordersCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('orders.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('orders.id', value));
    },
    ordersEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('orders.name', value));
    },
    farmerIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('orders.farmerid', value));
    },
    consumerIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('orders.consumerid', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('orders.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('orders.name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('orders.id');
      } else {
        baseCriteria.addOrderByDesc('orders.id');
      }
    },
    orderByOrders: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('orders.name');
      } else {
        baseCriteria.addOrderByDesc('orders.name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => ordersCriteria();