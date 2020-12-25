module.exports = {
    Types: `        type farmer{
                        id: Int!
                        imagephoto: String
                        farmerid:String
                        fname: String
                        mname:String 
                        lname: String
                        dob:String 
                        emailaddress: String
                        mobile:String 
                        gender: Int
                        genderType: String
                        accountid:String 
                        intime: String  
                        uptime: String    
                        status: Int
                      
                    }
                    type farmerList{
                        list:[farmer!]!
                        pageInfo: PageInfo
                    }
                    input farmerInput {
                        imagephoto: String
                        farmerid:String
                        fname: String
                        mname:String 
                        lname: String
                        dob:String 
                        emailaddress: String
                        mobile:String 
                        gender: Int
                        accountid:String
                        forregistration:Boolean
                        file:Upload     
                    }
                    
                    input farmerUpdateInput {
                        id: Int!
                        imagephoto: String
                        farmerid:String
                        fname: String
                        mname:String 
                        lname: String
                        dob:String 
                        emailaddress: String
                        mobile:String 
                        gender: Int
                        forregistration:Boolean
                        file:Upload
                    }
                    input farmerDeleteInput {
                        id: Int! 
                        status:Int
                    }
        `,
    RootQuery: `    getFarmerList ( pager: Pager, 
                                    filterStatus: FilterStatus,
                                    searchKeyword:SearchKeyword
                                    orderBy:OrderBy
                                ):  farmerList
                   getFarmerDetail   (id: Int!): farmer`,
    RootMutation: `createFarmer(farmerInput: farmerInput!): Boolean!
                   updateFarmer(farmerUpdateInput: farmerUpdateInput!): Boolean!
                   deleteFarmer(farmerDeleteInput: farmerDeleteInput!): Boolean!
`,
};
