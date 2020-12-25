/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');
const path = require('path');
const fs = require('fs');
const helpers = require('@Library/helpers');

async function getFileName(params) {
  const images = await params;
  const {filename } = await images.file;
  const extension = path.extname(filename);
  const newName = `${Date.now()}_${"banner"}${extension}`;
  return newName;

}

async function fileUpload(pathName, params, fileName){
  const images = await params;
  const { createReadStream } = await images.file;
   const rootPath = path.dirname(require.main.filename);
   const filePath = path.join(rootPath, 'uploads\\farmer\\'+pathName+"\\banner\\");

   if (!fs.existsSync(filePath)) {
     fs.mkdirSync(filePath, {recursive: true}, err => {});
   }

  const newPath = path.join(filePath, fileName);
  const stream = createReadStream();
  helpers.fileUploadHelper(newPath, stream);
}

async function InputValue(farmerbannerInput, isEdit = false) {
  const fileName = await getFileName(farmerbannerInput.file);
  const schema = {
    image: fileName || "default_photo.png",
    farmerid: farmerbannerInput.farmerid,
  };
  if (isEdit === true) {
    schema.id = farmerbannerInput.id;
  }

  return schema;
}

module.exports = {
  HandleCreateFarmerBanner: DBTransact(async (connection, { farmerbannerInput }) => {
    const repo = repository(connection);
    const data = await InputValue(farmerbannerInput);
    const newfarmerbannerStatus = await repo.farmerbannerRepository.createFarmerBanner(data);

    const getFarmerDetails = await repo.farmerRepository.getFarmerDetail(farmerbannerInput.farmerid);
    if(getFarmerDetails)
      fileUpload(getFarmerDetails.farmerid,farmerbannerInput.file, data.image);
    
      return newfarmerbannerStatus;
  }),
  HandleUpdateFarmerBanner: DBTransact(async (connection, { farmerbannerUpdateInput }) => {
    const repo = repository(connection);
    const data = await InputValue(farmerbannerUpdateInput, true);
    debugger;
    const newfarmerbannerUpdateStatus = await repo.farmerbannerRepository.updateFarmerBanner(data);

    const getFarmerDetails = await repo.farmerRepository.getFarmerDetail(farmerbannerUpdateInput.farmerid);
    if(getFarmerDetails)
      fileUpload(getFarmerDetails.farmerid,farmerbannerUpdateInput.file, data.image);

    return newfarmerbannerUpdateStatus;
  }),
  HandleDeleteFarmerBanner: DBTransact(async (connection, { farmerbannerDeleteInput }) => {
    const repo = repository(connection);
    const newfarmerbannerDeleteStatus = await repo.farmerbannerRepository.deleteFarmerBanner({
      id: farmerbannerDeleteInput.id,
      status: farmerbannerDeleteInput.status,
    });
    return newfarmerbannerDeleteStatus;
  }),
};