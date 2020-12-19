/* eslint-disable import/no-extraneous-dependencies */
const repository = require('@Library/repository');
const DBTransact = require('@Library/extensions/DBTransaction');

module.exports = {
  HandleCreateAccount: DBTransact(async (connection, { accountInput }) => {
    const repo = repository(connection);
    const newaccountStatus = await repo.accountRepository.createAccount({
      username: accountInput.username,
      password:accountInput.password,
    });
    return newaccountStatus;
  }),
  HandleUpdateAccount: DBTransact(async (connection, { accountUpdateInput }) => {
    const repo = repository(connection);
    const newaccountUpdateStatus = await repo.accountRepository.updateAccount({
      id: accountUpdateInput.id,
      username: accountUpdateInput.username,
      password:accountUpdateInput.password,
    });
    return newaccountUpdateStatus;
  }),
  HandleDeleteAccount: DBTransact(async (connection, { accountDeleteInput }) => {
    const repo = repository(connection);
    const newaccountDeleteStatus = await repo.accountRepository.deleteAccount({
      id: accountDeleteInput.id,
      status: accountDeleteInput.status,
    });
    return newaccountDeleteStatus;
  }),
};