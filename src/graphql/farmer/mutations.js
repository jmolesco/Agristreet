/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createFarmer: AnonymousAccess(
    AdminDomain.Farmer().ValidateCreateFarmer,
    AdminDomain.Farmer().HandleCreateFarmer,
  ),
  updateFarmer: AnonymousAccess(
    AdminDomain.Farmer().ValidateUpdateFarmer,
    AdminDomain.Farmer().HandleUpdateFarmer,
  ),
  deleteFarmer: AnonymousAccess(
    AdminDomain.Farmer().ValidateDeleteFarmer,
    AdminDomain.Farmer().HandleDeleteFarmer,
  ),
};
