/* eslint-disable import/no-extraneous-dependencies */
const DBTransact = require('@Library/extensions/DBTransaction');

const HandleStaffCSV = DBTransact(async (connection, csvData, operation) => {
});

module.exports = {
  HandleStaffCSV,
};
