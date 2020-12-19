
const Category = require('../category');
const Account = require('../account');
module.exports = {
  ...Category.Resolvers,
  ...Category.Mutations,
  ...Account.Resolvers,
  ...Account.Mutations,
};
