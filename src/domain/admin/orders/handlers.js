/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateOrders: DBTransact(async (connection, { ordersInput }) => {
    const repo = repository(connection);
    const newordersStatus = await repo.ordersRepository.createOrders({
      consumerid: ordersInput.consumerid,
      farmerid:ordersInput.farmerid,
      totalquantity: ordersInput.totalquantity,
      totalprice:ordersInput.totalprice,
      orderType: ordersInput.orderType,
      orderstatus: ordersInput.orderstatus,
    });
    return newordersStatus;
  }),
  HandleUpdateOrders: DBTransact(async (connection, { ordersUpdateInput }) => {
    const repo = repository(connection);
    const newordersUpdateStatus = await repo.ordersRepository.updateOrders({
      id: ordersUpdateInput.id,
      consumerid: ordersUpdateInput.consumerid,
      farmerid:ordersUpdateInput.farmerid,
      totalquantity: ordersUpdateInput.totalquantity,
      totalprice:ordersUpdateInput.totalprice,
      orderType: ordersUpdateInput.orderType,
      orderstatus: ordersUpdateInput.orderstatus,
    });
    return newordersUpdateStatus;
  }),
  HandleDeleteOrders: DBTransact(async (connection, { ordersDeleteInput }) => {
    const repo = repository(connection);
    const newordersDeleteStatus = await repo.ordersRepository.deleteOrders({
      id: ordersDeleteInput.id,
      status: ordersDeleteInput.status,
    });
    return newordersDeleteStatus;
  }),
};