module.exports = {
    Types: `        input farmerratingdetailInput {
                        ratingid: Int
                        consumerid:Int
                        orderid: Int
                        rate: Float
                    }
                `,
    RootQuery: ``,
    RootMutation: `createFarmerRatingDetail(farmerratingdetailInput: farmerratingdetailInput!): Boolean!
                `,
};
