const { buildSchema } = require('graphql');
const Category = require('../category');
const Account = require('../account');

const schema = `
${Category.Schema.Types}
${Account.Schema.Types}

input FilterStatus{
    status:Int           
}
input SearchKeyword{
    keyword:String           
}
input OrderBy{
    orderKey:Int
    orderType:Int
}
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
${Category.Schema.RootQuery} 
${Account.Schema.RootQuery} 

}

type RootMutation {
${Category.Schema.RootMutation}  
${Account.Schema.RootMutation}    

}

scalar Upload

schema {
    query: RootQuery
    mutation: RootMutation
}
`;

module.exports = buildSchema(schema);
