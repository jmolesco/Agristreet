/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
  getFarmerList: AnonymousAccess(
    AdminDomain.Farmer().MapFarmerList,
  ),
  getFarmerDetail: AnonymousAccess(
    AdminDomain.Farmer().MapFarmerDetail,
  ),
};
