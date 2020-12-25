const DbHelper = require('../dbhelper');

const productimageCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('productimage.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('productimage.id', value));
    },
    productimageEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('productimage.image', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('productimage.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('productimage.image', status));
    },
    farmerIdEqual: (farmerid) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('productimage.farmerid', farmerid));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('productimage.id');
      } else {
        baseCriteria.addOrderByDesc('productimage.id');
      }
    },
    orderByProductImage: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('productimage.image');
      } else {
        baseCriteria.addOrderByDesc('productimage.image');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => productimageCriteria();