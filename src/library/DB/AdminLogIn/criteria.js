const DbHelper = require('../dbhelper');

const adminUserCriteria = () => {
  const baseCriteria = DbHelper.baseCriteria();
  return {
    userIdEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('staff_m.id', value));
    },
    emailEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('staff_m.email', value));
    },
    passwordEqual: (value) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('staff_m.password', value));
    },
    statusEqual: (status) => {
      baseCriteria.addCondition(DbHelper.criteria.EQUAL('status', status));
    },
    ...baseCriteria,
  };
};


module.exports = () => adminUserCriteria();
