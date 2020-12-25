const DbHelper = require('../dbhelper');

const farmerbannerCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerbanner.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('farmerbanner.id', value));
    },
    farmerbannerEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerbanner.image', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerbanner.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('farmerbanner.image', status));
    },
    farmerIdEqual: (farmerid) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerbanner.farmerid', farmerid));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmerbanner.id');
      } else {
        baseCriteria.addOrderByDesc('farmerbanner.id');
      }
    },
    orderByFarmerBanner: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmerbanner.image');
      } else {
        baseCriteria.addOrderByDesc('farmerbanner.image');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => farmerbannerCriteria();