const AdminLogIn = require('./login');
const clientLogInCriteria = require('./criteria');
const Queries = require('./queries');

function AdminLogInRepository(connection) {
  const AdminLogInDB = AdminLogIn(connection);

  const getLogInDetails = async (crit = clientLogInCriteria()) => {
    try {
      const login = await AdminLogInDB.search(Queries.LogInDetails, crit.getBuildCriteria());
      return login;
    } catch (err) {
      throw err;
    }
  };

  return {
    getLogInDetails,
  };
}

module.exports = AdminLogInRepository;
