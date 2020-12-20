const connection = require('../connection');

const product = connection.getDbContext('product');
module.exports = product;