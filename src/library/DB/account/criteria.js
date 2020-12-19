const DbHelper = require('../dbhelper');

const accountCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    IdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('account.id', value));
    },
    notIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.NOT_EQUAL('account.id', value));
    },
    accountEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('account.username', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('account.status', status));
    },
    keywordLike: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.FULL_LIKE('account.username', status));
    },
    orderByID: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('account.id');
      } else {
        baseCriteria.addOrderByDesc('account.id');
      }
    },
    orderByaccount: (sortType) => {
      if (sortType === 1) {
        baseCriteria.addOrderBy('account.username');
      } else {
        baseCriteria.addOrderByDesc('account.username');
      }
    },
    orderByIntime: () => {
      baseCriteria.addOrderByDesc('OrderDateTime');
    },
    ...baseCriteria,
  };
};


module.exports = () => accountCriteria();