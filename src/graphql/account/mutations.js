/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  createAccount: AnonymousAccess(
    AdminDomain.Account().ValidateCreateAccount,
    AdminDomain.Account().HandleCreateAccount,
  ),
  updateAccount: AnonymousAccess(
    AdminDomain.Account().ValidateUpdateAccount,
    AdminDomain.Account().HandleUpdateAccount,
  ),
  deleteAccount: AnonymousAccess(
    AdminDomain.Account().ValidateDeleteAccount,
    AdminDomain.Account().HandleDeleteAccount,
  ),
};
