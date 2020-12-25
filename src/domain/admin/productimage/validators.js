/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateProductImageSchema, DeleteProductImageSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateProductImage: async ({ productimageInput }) => {
    const errors = validation.SchemaValidator(CreateProductImageSchema())(productimageInput);
    // skip other validation when error occured on previous validation

   
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateProductImage: async ({ productimageUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateProductImageSchema(true))(productimageUpdateInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteProductImage: async ({ productimageDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteProductImageSchema())(productimageDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};