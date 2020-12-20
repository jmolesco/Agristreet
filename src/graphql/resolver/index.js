
const Category = require('../category');
const Account = require('../account');
const Farmer = require('../farmer');
const FarmerRatingDetail = require('../farmerratingdetail');
module.exports = {
  ...Category.Resolvers,
  ...Category.Mutations,
  ...Account.Resolvers,
  ...Account.Mutations,
  ...Farmer.Resolvers,
  ...Farmer.Mutations,
  ...FarmerRatingDetail.Resolvers,
  ...FarmerRatingDetail.Mutations,
};
