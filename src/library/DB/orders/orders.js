const connection = require('../connection');

const orders = connection.getDbContext('orders');
module.exports = orders;