const connection = require('../connection');

const account = connection.getDbContext('account');
module.exports = account;
