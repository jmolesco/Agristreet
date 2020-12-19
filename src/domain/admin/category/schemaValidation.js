// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateCategorySchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.name = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.description = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  return schema;
};
const DeleteCategorySchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateCategorySchema,
  DeleteCategorySchema,
};