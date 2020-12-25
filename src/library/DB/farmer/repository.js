const farmer = require('./farmer');
const farmerCriteria = require('./criteria');

function farmerRepository(connection) {
  const farmerDB = farmer(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if(isEdit){
      if (props.accountid) {
        schema.accountid = props.accountid;
      }
    }
    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }

    //FOR INITIAL REGISTRATION

    if (props.farmerid) {
      schema.farmerid = props.farmerid;
    }
    if (props.fname) {
      schema.fname = props.fname;
    }
    if (props.mname) {
      schema.mname = props.mname;
    }

    if (props.lname) {
      schema.lname = props.lname;
    }
    if (props.emailaddress) {
      schema.emailaddress = props.emailaddress;
    }

    //FOR UPDATING OF INFO

    if (props.imagephoto) {
      schema.imagephoto = props.imagephoto;
    }

    if (props.dob) {
      schema.dob = props.dob;
    }

    if (props.mobile) {
      schema.mobile = props.mobile;
    }

    if (props.gender) {
      schema.gender = props.gender;
    }



    return schema;
  };
  const createFarmer = async (props) => {
    const farmerData = await inputValue(props);
    const result = await farmerDB.create(farmerData);
    return result;
  };

  const updateFarmer = async (props) => {
    const criteria = farmerCriteria();
    criteria.IdEqual(props.id);
    const farmerData = await inputValue(props, true);
    const result = await farmerDB.update(farmerData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteFarmer = async (props) => {
    const criteria = farmerCriteria();
    criteria.IdEqual(props.id);
    const farmerData = {};
    farmerData.status = props.status;
    const result = await farmerDB.update(farmerData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findFarmerById = async (id) => {
    try {
      const criteria = farmerCriteria();
      criteria.IdEqual(id);
      const farmerData = await farmerDB.findOne(criteria.getBuildCriteria());
      return farmerData;
    } catch (err) {
      throw err;
    }
  };
  const findFarmerByName = async (props, isEdit = false) => {
    try {
      const criteria = farmerCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.farmerEqual(props.username);
      const farmerData = await farmerDB.find(criteria.getBuildCriteria());
      return farmerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerList = async (crit = farmerCriteria()) => {
    try {
      const farmerData = await farmerDB.find(crit.getBuildCriteria());
      return farmerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerDetail = async (id) => {
    try {
      const farmerData = await farmerDB.findById(id, 'id');
      return farmerData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerListCount = async (crit = farmerCriteria()) => {
    try {
      const result = await farmerDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createFarmer,
    updateFarmer,
    deleteFarmer,
    findFarmerById,
    findFarmerByName,
    getFarmerList,
    getFarmerListCount,
    getFarmerDetail,
  };
}


module.exports = farmerRepository;