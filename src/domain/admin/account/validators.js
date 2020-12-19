/* eslint-disable import/no-extraneous-dependencies */
const validation = require('@Library/validation/');
const messages = require('@Library/message-resources');
// const { defineErrors } = require('@Library/helpers');
const repository = require('@Library/repository');
const { CreateAccountSchema, DeleteAccountSchema } = require('./schemaValidation');

module.exports = {
  ValidateCreateAccount: async ({ accountInput }) => {
    const errors = validation.SchemaValidator(CreateAccountSchema())(accountInput);
    // skip other validation when error occured on previous validation

    const result = await repository().accountRepository.findAccountByUsername(accountInput);
    if (result.length > 0) {
      errors.addFieldError('username', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateUpdateAccount: async ({ accountUpdateInput }) => {
    const errors = validation.SchemaValidator(CreateAccountSchema(true))(accountUpdateInput);
    // skip other validation when error occured on previous validation
    const result = await repository().accountRepository.findAccountByUsername(accountUpdateInput, true);
    if (result.length > 0) {
      errors.addFieldError('username', messages.LMS00002);
    }
    if (errors.hasError()) {
      throw errors;
    }
  },
  ValidateDeleteAccount: async ({ accountDeleteInput }) => {
    const errors = validation.SchemaValidator(DeleteAccountSchema())(accountDeleteInput);
    // skip other validation when error occured on previous validation
    if (errors.hasError()) {
      throw errors;
    }
  },
};