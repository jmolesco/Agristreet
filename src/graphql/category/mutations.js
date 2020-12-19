/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createCategory: AnonymousAccess(
    AdminDomain.Category().ValidateCreateCategory,
    AdminDomain.Category().HandleCreateCategory,
  ),
  updateCategory: AnonymousAccess(
    AdminDomain.Category().ValidateUpdateCategory,
    AdminDomain.Category().HandleUpdateCategory,
  ),
  deleteCategory: AnonymousAccess(
    AdminDomain.Category().ValidateDeleteCategory,
    AdminDomain.Category().HandleDeleteCategory,
  ),
};
