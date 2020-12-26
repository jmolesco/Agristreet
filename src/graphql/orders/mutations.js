/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createOrders: AnonymousAccess(
    AdminDomain.Orders().ValidateCreateOrders,
    AdminDomain.Orders().HandleCreateOrders,
  ),
  updateOrders: AnonymousAccess(
    AdminDomain.Orders().ValidateUpdateOrders,
    AdminDomain.Orders().HandleUpdateOrders,
  ),
  deleteOrders: AnonymousAccess(
    AdminDomain.Orders().ValidateDeleteOrders,
    AdminDomain.Orders().HandleDeleteOrders,
  ),
};
