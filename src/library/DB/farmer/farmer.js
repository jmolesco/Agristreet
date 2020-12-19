const connection = require('../connection');

const farmers = connection.getDbContext('farmers');
module.exports = farmers;