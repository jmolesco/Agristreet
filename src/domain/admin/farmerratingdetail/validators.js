/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateFarmerRatingDetailSchemaSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateFarmerRatingDetail: async ({ farmerratingdetailInput }) => {
    const errors = validation.SchemaValidator(CreateFarmerRatingDetailSchemaSchema())(farmerratingdetailInput);
    // skip other validation when error occured on previous validation

    
    if (errors.hasError()) {
      throw errors;
    }
  },  
};