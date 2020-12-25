// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateProductImageSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.farmerid = [validation.CheckRequired()];
  schema.productid = [validation.CheckRequired()];
  return schema;
};
const DeleteProductImageSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateProductImageSchema,
  DeleteProductImageSchema,
};