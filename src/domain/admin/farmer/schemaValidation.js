// eslint-disable-next-line import/no-extraneous-dependencies
const validation = require('@Library/validation');
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@Library/config');

const CreateFarmerSchema = (isEdit = false, forregistration) => {
  const schema = {};
  
  if (isEdit === true) {
    schema.id = [validation.CheckNumberValue(), validation.CheckRequired()];
  }

  schema.fname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.mname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.lname = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(), validation.CheckNoEnSpecialChars(), validation.CheckMaxLength(config.MAXLENGTH_TEXT)];
  schema.emailaddress = [validation.CheckRequired(), validation.CheckLeadingAndTrailingSpaces(),validation.CheckMaxLength(config.MAXLENGTH_TEXT), validation.CheckEmailFormat()];
  if(forregistration===false) {
    schema.dob = [validation.CheckRequired()];
    schema.mobile = [validation.CheckRequired(), validation.CheckMinLength(config.MINMOBILE_TEXT)];
    schema.gender = [validation.CheckRequired()];    
  }
  
  return schema;
};

const DeleteFarmerSchema = () => {
  const schema = {
    id: [validation.CheckNumberValue()],
  };
  return schema;
};
module.exports = {
  CreateFarmerSchema,
  DeleteFarmerSchema,
};