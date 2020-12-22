/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');
const { InventoryType } = require('@Library/constants');

module.exports = {
  HandleCreateInventory: DBTransact(async (connection, { inventoryInput }) => {
    const repo = repository(connection);
    const newinventoryStatus = await repo.inventoryRepository.createInventory({
      productid: inventoryInput.productid,
      farmerid:inventoryInput.farmerid,
      quantity:parseFloat(inventoryUpdateInput.quantity).toFixed(2)
    });
    return newinventoryStatus;
  }),
  HandleUpdateInventory: DBTransact(async (connection, { inventoryUpdateInput }) => {
    const repo = repository(connection);
    const newinventoryUpdateStatus = await repo.inventoryRepository.updateInventory({
      id:inventoryUpdateInput.id,
      productid: inventoryUpdateInput.productid,
      quantity:parseFloat(inventoryUpdateInput.quantity).toFixed(2)
    });
    const trail = await repo.inventorytrailRepository.createInventoryTrail({
      inventoryid:inventoryUpdateInput.id,
      quantity: parseFloat(inventoryUpdateInput.quantity).toFixed(2),
      type:InventoryType.IN
    });
    return (newinventoryUpdateStatus && trail);
  }),
  HandleDeleteInventory: DBTransact(async (connection, { inventoryDeleteInput }) => {
    const repo = repository(connection);
    const newinventoryDeleteStatus = await repo.inventoryRepository.deleteInventory({
      id: inventoryDeleteInput.id,
      status: inventoryDeleteInput.status,
    });
    return newinventoryDeleteStatus;
  }),
};