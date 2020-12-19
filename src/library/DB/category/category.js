const connection = require('../connection');

const category = connection.getDbContext('category');
module.exports = category;