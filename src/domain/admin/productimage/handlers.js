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
  const newName = `${Date.now()}_${"product"}${extension}`;
  return newName;

}

async function fileUpload(pathName, params, fileName,productid){
  const images = await params;
  const { createReadStream } = await images.file;
   const rootPath = path.dirname(require.main.filename);
   const filePath = path.join(rootPath, 'uploads\\farmer\\'+pathName+"\\product\\"+productid+"\\");

   if (!fs.existsSync(filePath)) {
     fs.mkdirSync(filePath, {recursive: true}, err => {});
   }

  const newPath = path.join(filePath, fileName);
  const stream = createReadStream();
  helpers.fileUploadHelper(newPath, stream);
}

async function InputValue(productimageInput, isEdit = false) {
  const fileName = await getFileName(productimageInput.file);
  const schema = {
    image: fileName || "default_photo.png",
    farmerid: productimageInput.farmerid,
    productid:productimageInput.productid
  };
  if (isEdit === true) {
    schema.id = productimageInput.id;
  }

  return schema;
}

module.exports = {
  HandleCreateProductImage: DBTransact(async (connection, { productimageInput }) => {
    const repo = repository(connection);
    const data = await InputValue(productimageInput);
    const newproductimageStatus = await repo.productimageRepository.createProductImage(data);

    const getFarmerDetails = await repo.farmerRepository.getFarmerDetail(productimageInput.farmerid);
    if(getFarmerDetails)
     fileUpload(getFarmerDetails.farmerid, productimageInput.file, data.image, data.productid);
    
      return newproductimageStatus;
  }),
  HandleUpdateProductImage: DBTransact(async (connection, { productimageUpdateInput }) => {
    const repo = repository(connection);
    const data = await InputValue(productimageUpdateInput, true);
    debugger;
    const newproductimageUpdateStatus = await repo.productimageRepository.updateProductImage(data);

    const getFarmerDetails = await repo.farmerRepository.getFarmerDetail(productimageUpdateInput.farmerid);
    if(getFarmerDetails)
      fileUpload(getFarmerDetails.farmerid,productimageUpdateInput.file, data.image, data.productid);

    return newproductimageUpdateStatus;
  }),
  HandleDeleteProductImage: DBTransact(async (connection, { productimageDeleteInput }) => {
    const repo = repository(connection);
    const newproductimageDeleteStatus = await repo.productimageRepository.deleteProductImage({
      id: productimageDeleteInput.id,
      status: productimageDeleteInput.status,
    });
    return newproductimageDeleteStatus;
  }),
};