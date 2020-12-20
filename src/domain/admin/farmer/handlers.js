/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateFarmer: DBTransact(async (connection, { farmerInput }) => {
    const repo = repository(connection);
    const newfarmerStatus = await repo.farmerRepository.createFarmer({
      imagephoto: farmerInput.imagephoto || "default_photo.png",
      farmerid:farmerInput.farmerid,
      fname: farmerInput.fname,
      mname:farmerInput.mname,
      lname: farmerInput.lname,
      dob:farmerInput.dob,
      emailaddress: farmerInput.emailaddress,
      mobile:farmerInput.mobile,
      gender:farmerInput.gender,
      accountid: farmerInput.accountid,
    });
    return newfarmerStatus;
  }),
  HandleUpdateFarmer: DBTransact(async (connection, { farmerUpdateInput }) => {
    const repo = repository(connection);
    const newfarmerUpdateStatus = await repo.farmerRepository.updateFarmer({
      id: farmerUpdateInput.id,
      imagephoto: farmerUpdateInput.imagephoto,
      //farmerid:farmerUpdateInput.farm..erid,
      fname: farmerUpdateInput.fname,
      mname:farmerUpdateInput.mname,
      lname: farmerUpdateInput.lname,
      dob:farmerUpdateInput.dob,
      emailaddress: farmerUpdateInput.emailaddress,
      mobile:farmerUpdateInput.mobile,
      gender:farmerUpdateInput.gender,
      //accountid: farmerUpdateInput.accountid,
    });
    return newfarmerUpdateStatus;
  }),
  HandleDeleteFarmer: DBTransact(async (connection, { farmerDeleteInput }) => {
    const repo = repository(connection);
    const newfarmerDeleteStatus = await repo.farmerRepository.deleteFarmer({
      id: farmerDeleteInput.id,
      status: farmerDeleteInput.status,
    });
    return newfarmerDeleteStatus;
  }),
};