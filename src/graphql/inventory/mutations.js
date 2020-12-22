/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createInventory: AnonymousAccess(
    AdminDomain.Inventory().ValidateCreateInventory,
    AdminDomain.Inventory().HandleCreateInventory,
  ),
  updateInventory: AnonymousAccess(
    AdminDomain.Inventory().ValidateUpdateInventory,
    AdminDomain.Inventory().HandleUpdateInventory,
  ),
  deleteInventory: AnonymousAccess(
    AdminDomain.Inventory().ValidateDeleteInventory,
    AdminDomain.Inventory().HandleDeleteInventory,
  ),
};
