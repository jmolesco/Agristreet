
/** ***
 *
 * START HERE FOR POITORE

 *
 */


// SAMPLE DECLARATION
const Category = require('./category');
const Account = require('./account');
const Farmer = require('./farmer');
const FarmerRatingDetail = require('./farmerratingdetail');
const Product = require('./product');
const Inventory = require('./inventory');
const InventoryTrail = require('./inventorydetail');
const FarmerBanner = require('./farmerbanner');
module.exports = {
// SAMPLE DECLARATION
//  Rank: () => Rank,
  Category                  :   ()=>          Category,
  Account                   :   ()=>          Account,
  Farmer                    :   ()=>          Farmer,
  FarmerRatingDetail        :   ()=>          FarmerRatingDetail,
  Product                   :   ()=>          Product,
  Inventory                 :   ()=>          Inventory,
  InventoryTrail            :   ()=>          InventoryTrail,
  FarmerBanner              :   ()=>          FarmerBanner,
};
