const DbHelper = require('../dbhelper');

const productCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('product.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('product.id', value));
    },
    productEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('product.productname', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('product.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('product.productname', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('product.id');
      } else {
        baseCriteria.addOrderByDesc('product.id');
      }
    },
    orderByproduct: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('product.productname');
      } else {
        baseCriteria.addOrderByDesc('product.productname');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => productCriteria();