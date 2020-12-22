// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateProductSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.farmerid = [validation.CheckRequired()];
  schema.categoryId = [validation.CheckRequired()];
  schema.measurementid = [validation.CheckRequired()];
  schema.price = [validation.CheckRequired(), validation.CheckNumberValue()];
  schema.description = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.productname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.brand = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  
  return schema;
};
const DeleteProductSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateProductSchema,
  DeleteProductSchema,
};