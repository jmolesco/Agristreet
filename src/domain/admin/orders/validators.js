/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateOrdersSchema, DeleteOrdersSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateOrders: async ({ ordersInput }) => {
    const errors = validation.SchemaValidator(CreateOrdersSchema())(ordersInput);
    // skip other validation when error occured on previous validation

    // const result = await repository().ordersRepository.findordersByName(ordersInput);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateOrders: async ({ ordersUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateOrdersSchema(true))(ordersUpdateInput);
    // skip other validation when error occured on previous validation
    // const result = await repository().ordersRepository.findordersByName(ordersUpdateInput, true);
    // if (result.length > 0) {
    //   errors.addFieldError('name', messages.LMS00002);
    // }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteOrders: async ({ ordersDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteOrdersSchema())(ordersDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};