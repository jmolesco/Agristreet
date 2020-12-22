const inventory = require('./inventory');
const inventoryCriteria = require('./criteria');
const { inventoryList } = require('./queries');

function inventoryRepository(connection) {
  const inventoryDB = inventory(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.productid) {
      schema.productid = props.productid;
    }

    if (props.farmerid) {
      schema.farmerid = props.farmerid;
    }
    if (props.quantity) {
      schema.quantity = props.quantity;
    }


    return schema;
  };
  const createInventory = async (props) => {
    const inventoryData = await inputValue(props);
    const result = await inventoryDB.create(inventoryData);
    return result.affectedRows > 0;
  };

  const updateInventory = async (props) => {
    const criteria = inventoryCriteria();
    criteria.IdEqual(props.id);
    const inventoryData = await inputValue(props, true);
    const result = await inventoryDB.update(inventoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteInventory = async (props) => {
    const criteria = inventoryCriteria();
    criteria.IdEqual(props.id);
    const inventoryData = {};
    inventoryData.status = props.status;
    const result = await inventoryDB.update(inventoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findInventoryById = async (id) => {
    try {
      const criteria = inventoryCriteria();
      criteria.IdEqual(id);
      const inventoryData = await inventoryDB.findOne(criteria.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const findInventoryByName = async (props, isEdit = false) => {
    try {
      const criteria = inventoryCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.inventoryEqual(props.name);
      const inventoryData = await inventoryDB.find(criteria.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryList = async (crit = inventoryCriteria()) => {
    try {
      const inventoryData = await inventoryDB.find(crit.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryDetail = async (crit = inventoryCriteria()) => {
    try {
      const inventoryData = await inventoryDB.search(inventoryList, crit);
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryListCount = async (crit = inventoryCriteria()) => {
    try {
      const result = await inventoryDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createInventory,
    updateInventory,
    deleteInventory,
    findInventoryById,
    findInventoryByName,
    getInventoryList,
    getInventoryListCount,
    getInventoryDetail,
  };
}


module.exports = inventoryRepository;