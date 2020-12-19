/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateCategorySchema, DeleteCategorySchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateCategory: async ({ categoryInput }) => {
    const errors = validation.SchemaValidator(CreateCategorySchema())(categoryInput);
    // skip other validation when error occured on previous validation

    const result = await repository().categoryRepository.findCategoryByName(categoryInput);
    if (result.length > 0) {
      errors.addFieldError('name', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateCategory: async ({ categoryUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateCategorySchema(true))(categoryUpdateInput);
    // skip other validation when error occured on previous validation
    const result = await repository().categoryRepository.findCategoryByName(categoryUpdateInput, true);
    if (result.length > 0) {
      errors.addFieldError('name', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteCategory: async ({ categoryDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteCategorySchema())(categoryDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};