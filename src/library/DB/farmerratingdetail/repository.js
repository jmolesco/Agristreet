const farmerratingdetail = require('./farmerratingdetail');
const farmerratingdetailCriteria = require('./criteria');

function farmerratingdetailRepository(connection) {
  const farmerrating = farmerratingdetail(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = [];

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.ratingid) {
      schema.push(props.ratingid);
    }

    if (props.consumerid) {
      schema.push(props.consumerid);
    }

    if (props.orderid) {
      schema.push(props.orderid);
    }
    if (props.rate) {
      schema.push(props.rate);
    }

    return schema;
  };
  const createFarmerRatingDetail = async (props) => {
    const farmerratingdetailData = await inputValue(props);
    //const result = await farmerrating.create(farmerratingdetailData);
    const result = await farmerrating.call("UpdateFarmerRating", farmerratingdetailData);
    return result.affectedRows > 0;
  };

  const updateFarmerRatingDetail = async (props) => {
    const criteria = farmerratingdetailCriteria();
    criteria.IdEqual(props.id);
    const farmerratingdetailData = await inputValue(props, true);
    const result = await farmerrating.update(farmerratingdetailData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteFarmerRatingDetail = async (props) => {
    const criteria = farmerratingdetailCriteria();
    criteria.IdEqual(props.id);
    const farmerratingdetailData = {};
    farmerratingdetailData.status = props.status;
    const result = await farmerrating.update(farmerratingdetailData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };


  const getFarmerRatingDetailList = async (crit = farmerratingdetailCriteria()) => {
    try {
      const farmerratingdetailData = await farmerrating.find(crit.getBuildCriteria());
      return farmerratingdetailData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerRatingDetailDetail = async (id) => {
    try {
      const farmerratingdetailData = await farmerrating.findById(id, 'id');
      return farmerratingdetailData;
    } catch (err) {
      throw err;
    }
  };
  const getFarmerRatingDetailListCount = async (crit = farmerratingdetailCriteria()) => {
    try {
      const result = await farmerrating.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createFarmerRatingDetail,
    updateFarmerRatingDetail,
    deleteFarmerRatingDetail,
    getFarmerRatingDetailList,
    getFarmerRatingDetailListCount,
    getFarmerRatingDetailDetail,
  };
}


module.exports = farmerratingdetailRepository;