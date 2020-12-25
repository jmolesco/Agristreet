/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createProductImage: AnonymousAccess(
    AdminDomain.ProductImage().ValidateCreateProductImage,
    AdminDomain.ProductImage().HandleCreateProductImage,
  ),
  updateProductImage: AnonymousAccess(
    AdminDomain.ProductImage().ValidateUpdateProductImage,
    AdminDomain.ProductImage().HandleUpdateProductImage,
  ),
  deleteProductImage: AnonymousAccess(
    AdminDomain.ProductImage().ValidateDeleteProductImage,
    AdminDomain.ProductImage().HandleDeleteProductImage,
  ),
};
