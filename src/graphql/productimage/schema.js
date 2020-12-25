module.exports = {
    Types: `
                    type productimage{
                        id: Int!
                        farmerid: Int
                        productid: Int
                        image:String   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type productimageList{
                        list:[productimage!]!
                        pageInfo: PageInfo
                    }
                    input productimageInput {
                        farmerid: Int
                        image:String
                        productid: Int
                        file:Upload       
                    }
                    
                    input productimageUpdateInput {
                        id: Int!
                        farmerid:Int
                        productid: Int
                        image:String
                        file:Upload   
                    }
                    input productimageDeleteInput {
                        id: Int!
                        status:Int
                    }
        `,
    RootQuery: `   getProductImageList (   pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                    hasFarmerId:FarmerIdInput
                                ):  productimageList
                   getProductImageDetail   (id: Int!): productimage`,
    RootMutation: `createProductImage(productimageInput: productimageInput!): Boolean!
                   updateProductImage(productimageUpdateInput: productimageUpdateInput!): Boolean!
                   deleteProductImage(productimageDeleteInput: productimageDeleteInput!): Boolean!
`,
};
