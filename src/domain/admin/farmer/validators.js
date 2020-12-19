/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
//const messages = require('@Library/message-resources');
//const repository = require('@Library/repository');
const { CreateFarmerSchema, DeleteFarmerSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateFarmer: async ({ farmerInput }) => {
    debugger;
    const errors = validation.SchemaValidator(CreateFarmerSchema(false, farmerInput.forregistration))(farmerInput);
    // skip other validation when error occured on previous validation

    // const result = await repository().farmerRepository.findfarmerByName(farmerInput);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }

    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateFarmer: async ({ farmerUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateFarmerSchema(true))(farmerUpdateInput);
    // skip other validation when error occured on previous validation
    // const result = await repository().farmerRepository.findfarmerByName(farmerUpdateInput, true);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteFarmer: async ({ farmerDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteFarmerSchema())(farmerDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};