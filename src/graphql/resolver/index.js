
const Category = require('../category');
const Account = require('../account');
const Farmer = require('../farmer');
const FarmerRatingDetail = require('../farmerratingdetail');
const Product = require('../product');
const Inventory = require('../inventory');
const InventoryTrail = require('../inventorydetail');
const FarmerBanner = require('../farmerbanner');
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
  ...Inventory.Resolvers,
  ...Inventory.Mutations,
  ...InventoryTrail.Resolvers,
  ...InventoryTrail.Mutations,
  ...FarmerBanner.Resolvers,
  ...FarmerBanner.Mutations,
};
