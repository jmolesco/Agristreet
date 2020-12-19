/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
  getList: AnonymousAccess(
    AdminDomain.AdminLogIn().MapAdminList,
  ),
};
