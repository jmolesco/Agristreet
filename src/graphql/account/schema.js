module.exports = {
    Types: `
                    type account{
                        id: Int!
                        username: String
                        password:String   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type accountList{
                        list:[account!]!
                        pageInfo: PageInfo
                    }
                    input accountInput {
                        username: String
                        password:String     
                    }
                    
                    input accountUpdateInput {
                        id: Int!
                        username: String
                        password:String 
                    }
                    input accountDeleteInput {
                        id: Int!
                        status:Int
                    }
        `,
    RootQuery:    ``,
    RootMutation: `createAccount(accountInput: accountInput!): Boolean!
                   updateAccount(accountUpdateInput: accountUpdateInput!): Boolean!
                   deleteAccount(accountDeleteInput: accountDeleteInput!): Boolean!
`,
};
