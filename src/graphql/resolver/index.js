
const Category = require('../category');
const Account = require('../account');
const Farmer = require('../farmer');
module.exports = {
  ...Category.Resolvers,
  ...Category.Mutations,
  ...Account.Resolvers,
  ...Account.Mutations,
  ...Farmer.Resolvers,
  ...Farmer.Mutations,
};
