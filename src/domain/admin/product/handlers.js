/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateProduct: DBTransact(async (connection, { productInput }) => {
    const repo = repository(connection);
    const newproductStatus = await repo.productRepository.createProduct({
      farmerid: productInput.farmerid,
      productname:productInput.productname,
      brand: productInput.brand,
      description:productInput.description,
      price: productInput.price,
      measurementid:productInput.measurementid,
      categoryId:productInput.categoryId
    });
    return newproductStatus;
  }),
  HandleUpdateProduct: DBTransact(async (connection, { productUpdateInput }) => {
    const repo = repository(connection);
    const newproductUpdateStatus = await repo.productRepository.updateProduct({
      id: productUpdateInput.id,
      farmerid: productUpdateInput.farmerid,
      productname:productUpdateInput.productname,
      brand: productUpdateInput.brand,
      description:productUpdateInput.description,
      price: productUpdateInput.price,
      measurementid:productUpdateInput.measurementid,
      categoryId:productUpdateInput.categoryId
    });
    return newproductUpdateStatus;
  }),
  HandleDeleteProduct: DBTransact(async (connection, { productDeleteInput }) => {
    const repo = repository(connection);
    const newproductDeleteStatus = await repo.productRepository.deleteProduct({
      id: productDeleteInput.id,
      status: productDeleteInput.status,
    });
    return newproductDeleteStatus;
  }),
};