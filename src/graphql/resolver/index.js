
const Category = require('../category');
const Account = require('../account');
const Farmer = require('../farmer');
const FarmerRatingDetail = require('../farmerratingdetail');
const Product = require('../product');
module.exports = {
  ...Category.Resolvers,
  ...Category.Mutations,
  ...Account.Resolvers,
  ...Account.Mutations,
  ...Farmer.Resolvers,
  ...Farmer.Mutations,
  ...FarmerRatingDetail.Resolvers,
  ...FarmerRatingDetail.Mutations,
  ...Product.Resolvers,
  ...Product.Mutations,
};
