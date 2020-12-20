/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateFarmerRatingDetail: DBTransact(async (connection, { farmerratingdetailInput }) => {
    const repo = repository(connection);
    const newFarmerRatingDetailStatus = await repo.farmerratingdetailRepository.createFarmerRatingDetail({
      ratingid: farmerratingdetailInput.ratingid,
      consumerid: farmerratingdetailInput.consumerid,
      orderid: farmerratingdetailInput.orderid,
      rate: parseFloat(farmerratingdetailInput.rate).toFixed(2),
    });
    return newFarmerRatingDetailStatus;
  }),

};