// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateAccountSchema = (isEdit = false) => {
  const schema = {};
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }
  schema.username = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(),validation.CheckMaxLength(config.MAXCREDENTIAL_TEXT), validation.CheckMinLength(config.MINCREDENTIAL_TEXT)];
  schema.password = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXCREDENTIAL_TEXT, validation.CheckMinLength(config.MINCREDENTIAL_TEXT))];
  return schema;
};
const DeleteAccountSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateAccountSchema,
  DeleteAccountSchema,
};