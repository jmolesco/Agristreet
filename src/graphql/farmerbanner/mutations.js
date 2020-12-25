/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createFarmerBanner: AnonymousAccess(
    AdminDomain.FarmerBanner().ValidateCreateFarmerBanner,
    AdminDomain.FarmerBanner().HandleCreateFarmerBanner,
  ),
  updateFarmerBanner: AnonymousAccess(
    AdminDomain.FarmerBanner().ValidateUpdateFarmerBanner,
    AdminDomain.FarmerBanner().HandleUpdateFarmerBanner,
  ),
  deleteFarmerBanner: AnonymousAccess(
    AdminDomain.FarmerBanner().ValidateDeleteFarmerBanner,
    AdminDomain.FarmerBanner().HandleDeleteFarmerBanner,
  ),
};
