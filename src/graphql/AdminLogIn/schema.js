module.exports = {
  Types: `
        input AdminLogInInput {
            email: String!
            password: String!            
        }

        type AdminLogInResult {
            token:String
            tokenExpiration:String
        }
        `,
  RootQuery: 'getList: AdminLogInResult',
  RootMutation: `
                adminLogIn(adminLogInInput: AdminLogInInput!): AdminLogInResult
            `,
};
