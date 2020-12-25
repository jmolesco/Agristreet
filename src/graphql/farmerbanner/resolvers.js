/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
  getFarmerBannerList: AnonymousAccess(
    AdminDomain.FarmerBanner().MapFarmerBannerList,
  ),
  getFarmerBannerDetail: AnonymousAccess(
    AdminDomain.FarmerBanner().MapFarmerBannerDetail,
  ),
};
