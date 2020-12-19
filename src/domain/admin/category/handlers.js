/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateCategory: DBTransact(async (connection, { categoryInput }) => {
    const repo = repository(connection);
    const newCategoryStatus = await repo.categoryRepository.createCategory({
      name: categoryInput.name,
      description:categoryInput.description,
    });
    return newCategoryStatus;
  }),
  HandleUpdateCategory: DBTransact(async (connection, { categoryUpdateInput }) => {
    const repo = repository(connection);
    const newCategoryUpdateStatus = await repo.categoryRepository.updateCategory({
      id: categoryUpdateInput.id,
      name: categoryUpdateInput.name,
      description:categoryInput.description,
    });
    return newCategoryUpdateStatus;
  }),
  HandleDeleteCategory: DBTransact(async (connection, { categoryDeleteInput }) => {
    const repo = repository(connection);
    const newCategoryDeleteStatus = await repo.categoryRepository.deleteCategory({
      id: categoryDeleteInput.id,
      status: categoryDeleteInput.status,
    });
    return newCategoryDeleteStatus;
  }),
};