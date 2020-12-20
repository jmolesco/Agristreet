const connection = require('../connection');

const farmerratingdetail = connection.getDbContext('farmerratingdetail');
module.exports = farmerratingdetail;