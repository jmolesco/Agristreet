const DbHelper = require('../dbhelper');

const categoryCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('category.id', value));
    },
    categoryEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.name', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('category.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('category.name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('category.id');
      } else {
        baseCriteria.addOrderByDesc('category.id');
      }
    },
    orderByCategory: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('category.name');
      } else {
        baseCriteria.addOrderByDesc('category.name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => categoryCriteria();