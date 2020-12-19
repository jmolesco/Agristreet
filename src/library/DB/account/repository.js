const account = require('./account');
const accountCriteria = require('./criteria');

function accountRepository(connection) {
  const accountDB = account(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.username) {
      schema.username = props.username;
    }

    if (props.password) {
      schema.password = props.password;
    }


    return schema;
  };
  const createAccount = async (props) => {
    const accountData = await inputValue(props);
    const result = await accountDB.create(accountData);
    return result.affectedRows > 0;
  };

  const updateAccount = async (props) => {
    const criteria = accountCriteria();
    criteria.IdEqual(props.id);
    const accountData = await inputValue(props, true);
    const result = await accountDB.update(accountData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteAccount = async (props) => {
    const criteria = accountCriteria();
    criteria.IdEqual(props.id);
    const accountData = {};
    accountData.status = props.status;
    const result = await accountDB.update(accountData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findAccountById = async (id) => {
    try {
      const criteria = accountCriteria();
      criteria.IdEqual(id);
      const accountData = await accountDB.findOne(criteria.getBuildCriteria());
      return accountData;
    } catch (err) {
      throw err;
    }
  };
  const findAccountByUsername = async (props, isEdit = false) => {
    try {
      const criteria = accountCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.accountEqual(props.username);
      const accountData = await accountDB.find(criteria.getBuildCriteria());
      return accountData;
    } catch (err) {
      throw err;
    }
  };
  const getAccountList = async (crit = accountCriteria()) => {
    try {
      const accountData = await accountDB.find(crit.getBuildCriteria());
      return accountData;
    } catch (err) {
      throw err;
    }
  };
  const getAccountDetail = async (id) => {
    try {
      const accountData = await accountDB.findById(id, 'id');
      return accountData;
    } catch (err) {
      throw err;
    }
  };
  const getAccountListCount = async (crit = accountCriteria()) => {
    try {
      const result = await accountDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createAccount,
    updateAccount,
    deleteAccount,
    findAccountById,
    findAccountByUsername,
    getAccountList,
    getAccountListCount,
    getAccountDetail,
  };
}


module.exports = accountRepository;