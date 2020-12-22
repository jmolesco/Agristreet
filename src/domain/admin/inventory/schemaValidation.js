// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateInventorySchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.productid =[validation.CheckNumberValue(), validation.CheckRequired()];
  schema.quantity  = [validation.CheckNumberValue(), validation.CheckRequired()];
  return schema;
};
const DeleteInventorySchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateInventorySchema,
  DeleteInventorySchema,
};