// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');

const CreateLogInSchema = () => {
  const schema = {
    email: [validation.CheckRequired(), validation.CheckEmailFormat()],
    password: [validation.CheckRequired()],
  };
  return schema;
};

module.exports = {
  CreateLogInSchema,
};
