
const Category = require('../category');

module.exports = {
  ...Category.Resolvers,
  ...Category.Mutations,
};
