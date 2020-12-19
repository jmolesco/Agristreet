const category = require('./category');
const categoryCriteria = require('./criteria');

function categoryRepository(connection) {
  const categoryDB = category(connection);

  const inputValue = async (props, isEdit = false) => {
    const schema = {};

    if (isEdit === true) {
      if (props.id) {
        schema.id = props.id;
      }
    }
    if (props.name) {
      schema.name = props.name;
    }

    if (props.description) {
      schema.description = props.description;
    }


    return schema;
  };
  const createCategory = async (props) => {
    const categoryData = await inputValue(props);
    const result = await categoryDB.create(categoryData);
    return result.affectedRows > 0;
  };

  const updateCategory = async (props) => {
    const criteria = categoryCriteria();
    criteria.IdEqual(props.id);
    const categoryData = await inputValue(props, true);
    const result = await categoryDB.update(categoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  const deleteCategory = async (props) => {
    const criteria = categoryCriteria();
    criteria.IdEqual(props.id);
    const categoryData = {};
    categoryData.status = props.status;
    const result = await categoryDB.update(categoryData, criteria.getBuildCriteria());
    return result.affectedRows > 0;
  };

  // Search and List
  const findCategoryById = async (id) => {
    try {
      const criteria = categoryCriteria();
      criteria.IdEqual(id);
      const categoryData = await categoryDB.findOne(criteria.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const findCategoryByName = async (props, isEdit = false) => {
    try {
      const criteria = categoryCriteria();
      if (isEdit === true) criteria.notIdEqual(props.id);

      criteria.categoryEqual(props.name);
      const categoryData = await categoryDB.find(criteria.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryList = async (crit = categoryCriteria()) => {
    try {
      const categoryData = await categoryDB.find(crit.getBuildCriteria());
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryDetail = async (id) => {
    try {
      const categoryData = await categoryDB.findById(id, 'id');
      return categoryData;
    } catch (err) {
      throw err;
    }
  };
  const getCategoryListCount = async (crit = categoryCriteria()) => {
    try {
      const result = await categoryDB.getCount(crit.getBuildCriteria(), 'id');
      return result;
    } catch (err) {
      throw err;
    }
  };
  return {
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryById,
    findCategoryByName,
    getCategoryList,
    getCategoryListCount,
    getCategoryDetail,
  };
}


module.exports = categoryRepository;