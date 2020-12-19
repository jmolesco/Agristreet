const Resolvers = require('./resolvers');
const Mutations = require('./mutations');
const { Types, RootQuery, RootMutation } = require('./schema');

module.exports = {
  Schema: {
    Types,
    RootQuery,
    RootMutation,
  },
  Resolvers,
  Mutations,
};
