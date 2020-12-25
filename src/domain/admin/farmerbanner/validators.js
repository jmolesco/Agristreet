/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateFarmerBannerSchema, DeleteFarmerBannerSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateFarmerBanner: async ({ farmerbannerInput }) => {
    const errors = validation.SchemaValidator(CreateFarmerBannerSchema())(farmerbannerInput);
    // skip other validation when error occured on previous validation

   
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateFarmerBanner: async ({ farmerbannerUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateFarmerBannerSchema(true))(farmerbannerUpdateInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteFarmerBanner: async ({ farmerbannerDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteFarmerBannerSchema())(farmerbannerDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};