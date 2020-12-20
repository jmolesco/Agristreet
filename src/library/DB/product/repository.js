const product = require('./product');
const productCriteria = require('./criteria');

function productRepository(connection) {
  const productDB = product(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.farmerid) {
      schema.farmerid = props.farmerid;
    }

    if (props.productname) {
      schema.productname = props.productname;
    }

    if (props.brand) {
      schema.brand = props.brand;
    }

    if (props.price) {
      schema.price = props.price;
    }

    if (props.price) {
      schema.price = props.price;
    }

    if (props.measurementid) {
      schema.measurementid = props.measurementid;
    }

    if (props.description) {
      schema.description = props.description;
    }

    return schema;
  };
  const createProduct = async (props) => {
    const productData = await inputValue(props);
    const result = await productDB.create(productData);
    return result.affectedRows > 0;
  };

  const updateProduct = async (props) => {
    const criteria = productCriteria();
    criteria.IdEqual(props.id);
    const productData = await inputValue(props, true);
    const result = await productDB.update(productData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteProduct = async (props) => {
    const criteria = productCriteria();
    criteria.IdEqual(props.id);
    const productData = {};
    productData.status = props.status;
    const result = await productDB.update(productData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findProductById = async (id) => {
    try {
      const criteria = productCriteria();
      criteria.IdEqual(id);
      const productData = await productDB.findOne(criteria.getBuildCriteria());
      return productData;
    } catch (err) {
      throw err;
    }
  };
  const findProductByName = async (props, isEdit = false) => {
    try {
      const criteria = productCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.productEqual(props.name);
      const productData = await productDB.find(criteria.getBuildCriteria());
      return productData;
    } catch (err) {
      throw err;
    }
  };
  const getProductList = async (crit = productCriteria()) => {
    try {
      const productData = await productDB.find(crit.getBuildCriteria());
      return productData;
    } catch (err) {
      throw err;
    }
  };
  const getProductDetail = async (id) => {
    try {
      const productData = await productDB.findById(id, 'id');
      return productData;
    } catch (err) {
      throw err;
    }
  };
  const getProductListCount = async (crit = productCriteria()) => {
    try {
      const result = await productDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    findProductByName,
    getProductList,
    getProductListCount,
    getProductDetail,
  };
}


module.exports = productRepository;