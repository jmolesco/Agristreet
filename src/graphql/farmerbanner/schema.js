module.exports = {
    Types: `
                    type farmerbanner{
                        id: Int!
                        farmerid: Int
                        image:String   
                        intime: String  
                        uptime: String    
                        status: Int
                    }
                    type farmerbannerList{
                        list:[farmerbanner!]!
                        pageInfo: PageInfo
                    }
                    input farmerbannerInput {
                        farmerid: Int
                        image:String
                        file:Upload       
                    }
                    
                    input farmerbannerUpdateInput {
                        id: Int!
                        farmerid:Int
                        image:String
                        file:Upload   
                    }
                    input farmerbannerDeleteInput {
                        id: Int!
                        status:Int
                    }
        `,
    RootQuery: `   getFarmerBannerList (   pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                    hasFarmerId:FarmerIdInput
                                ):  farmerbannerList
                   getFarmerBannerDetail   (id: Int!): farmerbanner`,
    RootMutation: `createFarmerBanner(farmerbannerInput: farmerbannerInput!): Boolean!
                   updateFarmerBanner(farmerbannerUpdateInput: farmerbannerUpdateInput!): Boolean!
                   deleteFarmerBanner(farmerbannerDeleteInput: farmerbannerDeleteInput!): Boolean!
`,
};
