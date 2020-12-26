const orders =  require('./orders');
const ordersCriteria = require('./criteria');

function ordersRepository(connection) {
  const ordersDB = orders(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.consumerid) {
      schema.consumerid = props.consumerid;
    }

    if (props.farmerid) {
      schema.farmerid = props.farmerid;
    }

    if (props.totalquantity) {
      schema.totalquantity = props.totalquantity;
    }

    if (props.totalprice) {
      schema.totalprice = props.totalprice;
    }

    if (props.orderType) {
      schema.orderType = props.orderType;
    }

    if (props.orderstatus) {
      schema.orderstatus = props.orderstatus;
    }


    return schema;
  };
  const createOrders =  async (props) => {
    const ordersData = await inputValue(props);
    const result = await ordersDB.create(ordersData);
    return result.affectedRows > 0;
  };

  const updateOrders =  async (props) => {
    const criteria = ordersCriteria();
    criteria.IdEqual(props.id);
    const ordersData = await inputValue(props, true);
    const result = await ordersDB.update(ordersData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteOrders =  async (props) => {
    const criteria = ordersCriteria();
    criteria.IdEqual(props.id);
    const ordersData = {};
    ordersData.status = props.status;
    const result = await ordersDB.update(ordersData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findOrdersById = async (id) => {
    try {
      const criteria = ordersCriteria();
      criteria.IdEqual(id);
      const ordersData = await ordersDB.findOne(criteria.getBuildCriteria());
      return ordersData;
    } catch (err) {
      throw err;
    }
  };
  const findOrdersByName = async (props, isEdit = false) => {
    try {
      const criteria = ordersCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.ordersEqual(props.name);
      const ordersData = await ordersDB.find(criteria.getBuildCriteria());
      return ordersData;
    } catch (err) {
      throw err;
    }
  };
  const getOrdersList = async (crit = ordersCriteria()) => {
    try {
      const ordersData = await ordersDB.find(crit.getBuildCriteria());
      return ordersData;
    } catch (err) {
      throw err;
    }
  };
  const getOrdersDetail = async (id) => {
    try {
      const ordersData = await ordersDB.findById(id, 'id');
      return ordersData;
    } catch (err) {
      throw err;
    }
  };
  const getOrdersListCount = async (crit = ordersCriteria()) => {
    try {
      const result = await ordersDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createOrders,
    updateOrders,
    deleteOrders,
    findOrdersById,
    findOrdersByName,
    getOrdersList,
    getOrdersListCount,
    getOrdersDetail,
  };
}


module.exports = ordersRepository;