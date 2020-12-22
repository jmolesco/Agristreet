/* eslint-disable import/no-extraneous-dependencies */
const { AdminAccess, AnonymousAccess, MemberAccess } = require('@Library/middleware/auth');
const AdminDomain = require('@AdminDomain');
// const ClientDomain = require('@ClientDomain');

module.exports = {
    getInventoryDetail: AnonymousAccess(
        AdminDomain.Inventory().MapInventoryDetail,
    ),
};
