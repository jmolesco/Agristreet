const productimage =  require('./productimage');
const productimageCriteria = require('./criteria');

function productimageRepository(connection) {
  const productimageDB = productimage(connection);

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

    if (props.image) {
      schema.image = props.image;
    }

    if (props.productid) {
      schema.productid = props.productid;
    }


    return schema;
  };
  const createProductImage =  async (props) => {
    const productimageData = await inputValue(props);
    const result = await productimageDB.create(productimageData);
    return result.affectedRows > 0;
  };

  const updateProductImage =  async (props) => {
    const criteria = productimageCriteria();
    criteria.IdEqual(props.id);
    const productimageData = await inputValue(props, true);
    const result = await productimageDB.update(productimageData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteProductImage =  async (props) => {
    const criteria = productimageCriteria();
    criteria.IdEqual(props.id);
    const productimageData = {};
    productimageData.status = props.status;
    const result = await productimageDB.update(productimageData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findProductImageById = async (id) => {
    try {
      const criteria = productimageCriteria();
      criteria.IdEqual(id);
      const productimageData = await productimageDB.findOne(criteria.getBuildCriteria());
      return productimageData;
    } catch (err) {
      throw err;
    }
  };
  const findProductImageByName = async (props, isEdit = false) => {
    try {
      const criteria = productimageCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.productimageEqual(props.name);
      const productimageData = await productimageDB.find(criteria.getBuildCriteria());
      return productimageData;
    } catch (err) {
      throw err;
    }
  };
  const getProductImageList = async (crit = productimageCriteria()) => {
    try {
      const productimageData = await productimageDB.find(crit.getBuildCriteria());
      return productimageData;
    } catch (err) {
      throw err;
    }
  };
  const getProductImageDetail = async (id) => {
    try {
      const productimageData = await productimageDB.findById(id, 'id');
      return productimageData;
    } catch (err) {
      throw err;
    }
  };
  const getProductImageListCount = async (crit = productimageCriteria()) => {
    try {
      const result = await productimageDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createProductImage,
    updateProductImage,
    deleteProductImage,
    findProductImageById,
    findProductImageByName,
    getProductImageList,
    getProductImageListCount,
    getProductImageDetail,
  };
}


module.exports = productimageRepository;