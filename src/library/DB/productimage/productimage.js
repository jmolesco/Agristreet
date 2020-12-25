const connection = require('../connection');

const productimage = connection.getDbContext('productimage');
module.exports = productimage;