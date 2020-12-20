/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createProduct: AnonymousAccess(
    AdminDomain.Product().ValidateCreateProduct,
    AdminDomain.Product().HandleCreateProduct,
  ),
  updateProduct: AnonymousAccess(
    AdminDomain.Product().ValidateUpdateProduct,
    AdminDomain.Product().HandleUpdateProduct,
  ),
  deleteProduct: AnonymousAccess(
    AdminDomain.Product().ValidateDeleteProduct,
    AdminDomain.Product().HandleDeleteProduct,
  ),
};
