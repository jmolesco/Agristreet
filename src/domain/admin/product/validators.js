/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateProductSchema, DeleteProductSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateProduct: async ({ productInput }) => {
    const errors = validation.SchemaValidator(CreateProductSchema())(productInput);
    // skip other validation when error occured on previous validation

    // const result = await repository().productRepository.findproductByName(productInput);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateProduct: async ({ productUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateProductSchema(true))(productUpdateInput);
    // skip other validation when error occured on previous validation
    // const result = await repository().productRepository.findproductByName(productUpdateInput, true);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteProduct: async ({ productDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteProductSchema())(productDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};