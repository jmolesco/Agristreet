const connection = require('../connection');

const inventorytrail = connection.getDbContext('inventorytrail');
module.exports = inventorytrail;