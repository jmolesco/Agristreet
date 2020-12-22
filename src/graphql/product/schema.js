module.exports = {
    Types: `
                    type product{
                        id: Int
                        categoryId:Int
                        categoryName:String
                        farmerid: Int
                        productname:String
                        brand: String
                        description:String   
                        price: Float
                        measurementid: Int
                        type:String
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type productList{
                        list:[product!]!
                        pageInfo: PageInfo
                    }
                    input productInput {
                        farmerid: Int
                        categoryId:Int
                        productname:String
                        brand: String
                        description:String   
                        price: Float
                        measurementid: Int
                    }
                    
                    input productUpdateInput {
                        id: Int!
                        farmerid: Int
                        categoryId:Int
                        productname:String
                        brand: String
                        description:String   
                        price: Float
                        measurementid: Int
                    }
                    input productDeleteInput {
                        id: Int!
                        status:Int
                    }
                    input FarmerIdInput{
                        farmerid:Int
                    }
        `,
    RootQuery: `    getProductList (   pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                    hasFarmerId:FarmerIdInput
                                ):  productList
                   getProductDetail   (id: Int!): product`,
    RootMutation: `createProduct(productInput: productInput!): Boolean!
                   updateProduct(productUpdateInput: productUpdateInput!): Boolean!
                   deleteProduct(productDeleteInput: productDeleteInput!): Boolean!
`,
};
