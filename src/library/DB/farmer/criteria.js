const DbHelper = require('../dbhelper');

const farmersCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmers.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('farmers.id', value));
    },
    farmersEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmers.username', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmers.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('farmers.username', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmers.id');
      } else {
        baseCriteria.addOrderByDesc('farmers.id');
      }
    },
    orderByfarmers: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmers.username');
      } else {
        baseCriteria.addOrderByDesc('farmers.username');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => farmersCriteria();