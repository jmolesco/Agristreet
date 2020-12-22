/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
  getProductList: AnonymousAccess(
    AdminDomain.Product().MapProductList,
  ),
  getProductDetail: AnonymousAccess(
    AdminDomain.Product().MapProductDetail,
  ),
};
