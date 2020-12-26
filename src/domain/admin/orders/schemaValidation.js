// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateOrdersSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.consumerid = [validation.CheckRequired()];
  schema.farmerid = [validation.CheckRequired()];
  schema.totalquantity = [validation.CheckRequired(), validation.CheckNumberValue(),];
  schema.totalprice = [validation.CheckRequired(), validation.CheckNumberValue(),];
  schema.orderType = [validation.CheckRequired(), validation.CheckNumberValue(),];
  schema.orderstatus = [validation.CheckRequired(), validation.CheckNumberValue(),];
  
  return schema;
};
const DeleteOrdersSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateOrdersSchema,
  DeleteOrdersSchema,
};