module.exports = {
    Types: `
                    type orders{
                        id: Int!
                        consumerid: Int
                        farmerid:Int
                        totalquantity:Float
                        totalprice: Float
                        orderstatus:Int
                        orderType:Int   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type ordersList{
                        list:[orders!]!
                        pageInfo: PageInfo
                    }
                    input ordersInput {
                        consumerid: Int
                        farmerid:Int
                        totalquantity:Float
                        totalprice: Float
                        orderstatus:Int
                        orderType:Int     
                    }
                    
                    input ordersUpdateInput {
                        id: Int!
                        consumerid: Int
                        farmerid:Int
                        totalquantity:Float
                        totalprice: Float
                        orderType:Int   
                        orderstatus:Int
                    }
                    input ordersDeleteInput {
                        id: Int!
                        status:Int
                    }
                    input ordersFarmerAndCustomer {
                        id: Int!
                        consumerid: Int
                        farmerid:Int
                    }
        `,
    RootQuery: `    getOrdersList ( pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    hasFarmerandCustomerId:ordersFarmerAndCustomer
                                    orderBy:OrderBy
                                ):  ordersList
                   getOrdersDetail   (id: Int!): orders`,
    RootMutation: `createOrders(ordersInput: ordersInput!): Boolean!
                   updateOrders(ordersUpdateInput: ordersUpdateInput!): Boolean!
                   deleteOrders(ordersDeleteInput: ordersDeleteInput!): Boolean!
`,
};
