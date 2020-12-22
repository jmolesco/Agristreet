/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateInventorySchema, DeleteInventorySchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateInventory: async ({ inventoryInput }) => {
    const errors = validation.SchemaValidator(CreateInventorySchema())(inventoryInput);
    // skip other validation when error occured on previous validation

    // const result = await repository().inventoryRepository.findinventoryByName(inventoryInput);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateInventory: async ({ inventoryUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateInventorySchema(true))(inventoryUpdateInput);
    // skip other validation when error occured on previous validation
    // const result = await repository().inventoryRepository.findinventoryByName(inventoryUpdateInput, true);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteInventory: async ({ inventoryDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteInventorySchema())(inventoryDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};