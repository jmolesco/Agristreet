const connection = require('../connection');

const farmerbanner = connection.getDbContext('farmerbanner');
module.exports = farmerbanner;