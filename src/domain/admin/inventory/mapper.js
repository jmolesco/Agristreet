const DB = require('@Library/repository');
const config = require('@Library/config');
const { SortType } = require('@Library/constants');
const inventoryCriteria = require('@Library/DB/inventory/criteria');

module.exports = {
  MapInventoryDetail: async ({ id }) => {
    const repository = DB();
    const criteria = inventoryCriteria();
    criteria.IdEqual(id);
    const result = await repository.inventoryRepository.getInventoryDetail(criteria);
    return repository.MapGetDataList(result[0]||null);
  },
};