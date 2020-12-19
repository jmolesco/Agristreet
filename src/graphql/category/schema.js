module.exports = {
    Types: `
                    type category{
                        id: Int!
                        name: String
                        description:String   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type categoryList{
                        list:[category!]!
                        pageInfo: PageInfo
                    }
                    input categoryInput {
                        name: String
                        description:String     
                    }
                    
                    input categoryUpdateInput {
                        id: Int!
                        name: String
                        description:String 
                    }
                    input categoryDeleteInput {
                        id: Int!
                        status:Int
                    }
        `,
    RootQuery: `    getCategoryList (   pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                ):  categoryList
                   getCategoryDetail   (id: Int!): category`,
    RootMutation: `createCategory(categoryInput: categoryInput!): Boolean!
                   updateCategory(categoryUpdateInput: categoryUpdateInput!): Boolean!
                   deleteCategory(categoryDeleteInput: categoryDeleteInput!): Boolean!
`,
};
