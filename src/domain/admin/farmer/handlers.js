/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const helpers = require('@Library/helpers');
const DBTransact = require('@Library/extensions/DBTransaction');
const path = require('path');
const fs = require('fs');

async function getFileName(params) {
  const images = await params;
  const {filename } = await images.file;
  const extension = path.extname(filename);
  const newName = `${Date.now()}_${"profile"}${extension}`;
  return newName;

}

async function fileUpload(pathName, params, fileName){
  const images = await params;
  const { createReadStream } = await images.file;
   const rootPath = path.dirname(require.main.filename);
   const filePath = path.join(rootPath, 'uploads\\farmer\\'+pathName);

   if (!fs.existsSync(filePath)) {
     fs.mkdirSync(filePath, {recursive: true}, err => {});
   }

  const newPath = path.join(filePath, fileName);
  const stream = createReadStream();
  helpers.fileUploadHelper(newPath, stream);

}

async function InputValue(farmerInput, isEdit = false) {
  const fileName = await getFileName(farmerInput.file);
  const schema = {
    imagephoto: fileName || "default_photo.png",
    farmerid:farmerInput.farmerid,
    fname: farmerInput.fname,
    mname:farmerInput.mname,
    lname: farmerInput.lname,
    dob:farmerInput.dob,
    emailaddress: farmerInput.emailaddress,
    mobile:farmerInput.mobile,
    gender:farmerInput.gender,
    accountid: farmerInput.accountid,
  };
  if (isEdit === true) {
    schema.id = farmerInput.id;
  }

  return schema;
}

module.exports = {
  HandleCreateFarmer: DBTransact(async (connection, { farmerInput }) => {
    const repo = repository(connection);
    const data = await InputValue(farmerInput);
    const newfarmerStatus = await repo.farmerRepository.createFarmer(data);
    const getFarmerDetails = await repo.farmerRepository.getFarmerDetail(newfarmerStatus.insertId);
    if(getFarmerDetails)
      fileUpload(getFarmerDetails.farmerid,farmerInput.file, data.imagephoto);
    
    return newfarmerStatus.affectedRows > 0;
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