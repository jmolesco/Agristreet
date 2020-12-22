module.exports = {
    Types: `
                    type inventorytrail{
                        id: Int
                        inventoryid:Int
                        type:Int  
                        typeName:String
                        quantity:Int   
                        intime: String  
                        uptime: String    
                        status: Int
                        OrderDateTime:String
                    }
                    type inventorytrailList{
                        list:[inventorytrail!]!
                        pageInfo: PageInfo
                    }
                    
                    input InventoryTrailInput{
                        inventoryid:Int
                    }
        `,
    RootQuery: `getInventoryTrailList (   pager: Pager, 
                                            filterStatus: FilterStatus,
                                            searchKeyword:SearchKeyword
                                            orderBy:OrderBy
                                            hasInventoryId:InventoryTrailInput
                                        ):  inventorytrailList`,
    RootMutation: ``,
};
