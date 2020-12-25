const farmerbanner = require('./farmerbanner');
const farmerbannerCriteria = require('./criteria');

function farmerbannerRepository(connection) {
  const farmerbannerDB = farmerbanner(connection);

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


    return schema;
  };
  const createFarmerBanner = async (props) => {
    const farmerbannerData = await inputValue(props);
    const result = await farmerbannerDB.create(farmerbannerData);
    return result.affectedRows > 0;
  };

  const updateFarmerBanner = async (props) => {
    const criteria = farmerbannerCriteria();
    criteria.IdEqual(props.id);
    const farmerbannerData = await inputValue(props, true);
    const result = await farmerbannerDB.update(farmerbannerData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteFarmerBanner = async (props) => {
    const criteria = farmerbannerCriteria();
    criteria.IdEqual(props.id);
    const farmerbannerData = {};
    farmerbannerData.status = props.status;
    const result = await farmerbannerDB.update(farmerbannerData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findFarmerBannerById = async (id) => {
    try {
      const criteria = farmerbannerCriteria();
      criteria.IdEqual(id);
      const farmerbannerData = await farmerbannerDB.findOne(criteria.getBuildCriteria());
      return farmerbannerData;
    } catch (err) {
      throw err;
    }
  };
  const findFarmerBannerByName = async (props, isEdit = false) => {
    try {
      const criteria = farmerbannerCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.farmerbannerEqual(props.name);
      const farmerbannerData = await farmerbannerDB.find(criteria.getBuildCriteria());
      return farmerbannerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerBannerList = async (crit = farmerbannerCriteria()) => {
    try {
      const farmerbannerData = await farmerbannerDB.find(crit.getBuildCriteria());
      return farmerbannerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerBannerDetail = async (id) => {
    try {
      const farmerbannerData = await farmerbannerDB.findById(id, 'id');
      return farmerbannerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerBannerListCount = async (crit = farmerbannerCriteria()) => {
    try {
      const result = await farmerbannerDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createFarmerBanner,
    updateFarmerBanner,
    deleteFarmerBanner,
    findFarmerBannerById,
    findFarmerBannerByName,
    getFarmerBannerList,
    getFarmerBannerListCount,
    getFarmerBannerDetail,
  };
}


module.exports = farmerbannerRepository;