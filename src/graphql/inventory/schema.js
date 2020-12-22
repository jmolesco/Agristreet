module.exports = {
    Types: `
                    type inventory{
                        id: Int
                        productid:Int
                        farmerid:Int 
                        productname:String
                        type:String  
                        quantity:Int   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type inventoryList{
                        list:[inventory!]!
                        pageInfo: PageInfo
                    }
                    input inventoryInput {
                        productid:Int
                        farmerid:Int 
                        inventoryType:Int  
                        quantity:Int  
                    }
                    
                    input inventoryUpdateInput {
                        id: Int!
                        productid:Int
                        inventoryType:Int
                        quantity:Float  
                    }
                    input inventoryDeleteInput {
                        id: Int!
                        status:Int
                    }
        `,
    RootQuery: `   getInventoryDetail (id: Int!): inventory
    `,
    RootMutation: `createInventory(inventoryInput: inventoryInput!): Boolean!
                   updateInventory(inventoryUpdateInput: inventoryUpdateInput!): Boolean!
                   deleteInventory(inventoryDeleteInput: inventoryDeleteInput!): Boolean!
`,
};
