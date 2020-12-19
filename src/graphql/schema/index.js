const { buildSchema } = require('graphql');
const AdminLogIn = require('../AdminLogIn');


const schema = `
${AdminLogIn.Schema.Types}

input Pager {
    page: Int!
    maxRecord: Int
}

type PageInfo {
    totalRecords: Int!
    totalPage: Int!
    currentPage: Int!
    totalPerPage: Int
}

type RootQuery {
${AdminLogIn.Schema.RootQuery}    

}

type RootMutation {
${AdminLogIn.Schema.RootMutation}   

}

scalar Upload

schema {
    query: RootQuery
    mutation: RootMutation
}
`;

module.exports = buildSchema(schema);
