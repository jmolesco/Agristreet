const { buildSchema } = require('graphql');
const Category = require('../category');
const Account = require('../account');
const Farmer = require('../farmer');
const FarmerRatingDetail = require('../farmerratingdetail');
const Product = require('../product');
const Inventory = require('../inventory');
const InventoryTrail = require('../inventorydetail');
const schema = `
${Category.Schema.Types}
${Account.Schema.Types}
${Farmer.Schema.Types}
${FarmerRatingDetail.Schema.Types}
${Product.Schema.Types}
${Inventory.Schema.Types}
${InventoryTrail.Schema.Types}
input FilterStatus{
    status:Int           
}
input SearchKeyword{
    keyword:String           
}
input OrderBy{
    orderKey:Int
    orderType:Int
}
input Pager {
    page: Int!
    maxRecord: Int
}
type PageInfo {
    totalRecords: Int!
    totalPage: Int!
    currentPage: Int!
    totalPerPage: Int
}

type RootQuery {
${Category.Schema.RootQuery} 
${Account.Schema.RootQuery} 
${Farmer.Schema.RootQuery} 
${FarmerRatingDetail.Schema.RootQuery} 
${Product.Schema.RootQuery} 
${Inventory.Schema.RootQuery} 
${InventoryTrail.Schema.RootQuery} 
}

type RootMutation {
${Category.Schema.RootMutation}  
${Account.Schema.RootMutation}    
${Farmer.Schema.RootMutation}    
${FarmerRatingDetail.Schema.RootMutation}    
${Product.Schema.RootMutation}   
${Inventory.Schema.RootMutation}   
${InventoryTrail.Schema.RootMutation}   
}

scalar Upload

schema {
    query: RootQuery
    mutation: RootMutation
}
`;

module.exports = buildSchema(schema);
