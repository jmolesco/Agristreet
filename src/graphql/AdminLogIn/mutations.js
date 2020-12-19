/* eslint-disable import/no-extraneous-dependencies */
const { AnonymousAccess, AdminAccess } = require('@Library/middleware/auth');
// const ClientDomain = require('@ClientDomain');
const AdminDomain = require('@AdminDomain');


module.exports = {
  adminLogIn: AnonymousAccess(
    AdminDomain.AdminLogIn().HandleClientLogIn,
  ),
};
