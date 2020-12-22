const inventorytrail = require('./inventorydetail');
const inventoryCriteria = require('./criteria');
const { inventoryTrailList } = require('./queries');

function inventorytrailRepository(connection) {
  const inventorytrailDB = inventorytrail(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.inventoryid) {
      schema.inventoryid = props.inventoryid;
    }

    if (props.quantity) {
      schema.quantity = props.quantity;
    }
    if (props.type) {
      schema.type = props.type;
    }


    return schema;
  };
  const createInventoryTrail = async (props) => {
    const inventoryData = await inputValue(props);
    const result = await inventorytrailDB.create(inventoryData);
    return result.affectedRows > 0;
  };

  const updateInventoryTrail = async (props) => {
    const criteria = inventoryCriteria();
    criteria.IdEqual(props.id);
    const inventoryData = await inputValue(props, true);
    const result = await inventorytrailDB.update(inventoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteInventoryTrail = async (props) => {
    const criteria = inventoryCriteria();
    criteria.IdEqual(props.id);
    const inventoryData = {};
    inventoryData.status = props.status;
    const result = await inventorytrailDB.update(inventoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findInventoryTrailById = async (id) => {
    try {
      const criteria = inventoryCriteria();
      criteria.IdEqual(id);
      const inventoryData = await inventorytrailDB.findOne(criteria.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const findInventoryTrailByName = async (props, isEdit = false) => {
    try {
      const criteria = inventoryCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.inventoryEqual(props.name);
      const inventoryData = await inventorytrailDB.find(criteria.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryTrailList = async (crit = inventoryCriteria()) => {
    try {
      const inventoryData = await inventorytrailDB.search(inventoryTrailList,crit.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryTrailDetail = async (crit = inventoryCriteria()) => {
    try {
      const inventoryData = await inventorytrailDB.search(inventoryTrailList,crit.getBuildCriteria());
      return inventoryData;
    } catch (err) {
      throw err;
    }
  };
  const getInventoryTrailCount = async (crit = inventoryCriteria()) => {
    try {
      const result =  await inventorytrailDB.search(inventoryTrailList,crit.getBuildCriteria());
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createInventoryTrail,
    updateInventoryTrail,
    deleteInventoryTrail,
    findInventoryTrailById,
    findInventoryTrailByName,
    getInventoryTrailList,
    getInventoryTrailCount,
    getInventoryTrailDetail,
  };
}


module.exports = inventorytrailRepository;