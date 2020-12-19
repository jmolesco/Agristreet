
const AdminLogIn = require('../AdminLogIn');

module.exports = {
  ...AdminLogIn.Resolvers,
  ...AdminLogIn.Mutations,
};
