module.exports = {
    Types: `
                    type product{
                        id: Int!
                        farmerid: Int
                        productname:String
                        brand: String
                        description:String   
                        price: Float
                        measurementid: Int
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
                        productname:String
                        brand: String
                        description:String   
                        price: Float
                        measurementid: Int
                    }
                    
                    input productUpdateInput {
                        id: Int!
                        farmerid: Int
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
        `,
    RootQuery: `    geteProductList (   pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                ):  productList
                   geteProductDetail   (id: Int!): product`,
    RootMutation: `createProduct(productInput: productInput!): Boolean!
                   updateProduct(productUpdateInput: productUpdateInput!): Boolean!
                   deleteProduct(productDeleteInput: productDeleteInput!): Boolean!
`,
};
