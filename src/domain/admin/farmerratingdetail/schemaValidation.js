// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateFarmerRatingDetailSchemaSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.ratingid = [validation.CheckRequired(), validation.CheckNumberValue()];
  schema.consumerid = [validation.CheckRequired(), validation.CheckNumberValue()];
  schema.orderid = [validation.CheckRequired(), validation.CheckNumberValue()];
  return schema;
};
const DeleteFarmerRatingDetailSchemaSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateFarmerRatingDetailSchemaSchema,
  DeleteFarmerRatingDetailSchemaSchema,
};