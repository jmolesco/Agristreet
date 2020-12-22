const connection = require('../connection');

const inventory = connection.getDbContext('inventory');
module.exports = inventory;