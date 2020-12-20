const DbHelper = require('../dbhelper');

const farmerratingdetailCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerratingdetail.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('farmerratingdetail.id', value));
    },
    farmerratingdetailEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerratingdetail.name', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('farmerratingdetail.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('farmerratingdetail.name', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmerratingdetail.id');
      } else {
        baseCriteria.addOrderByDesc('farmerratingdetail.id');
      }
    },
    orderByfarmerratingdetail: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('farmerratingdetail.name');
      } else {
        baseCriteria.addOrderByDesc('farmerratingdetail.name');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => farmerratingdetailCriteria();