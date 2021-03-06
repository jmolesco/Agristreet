/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
  getProductImageList: AnonymousAccess(
    AdminDomain.ProductImage().MapProductImageList,
  ),
  getProductImageDetail: AnonymousAccess(
    AdminDomain.ProductImage().MapProductImageDetail,
  ),
};
