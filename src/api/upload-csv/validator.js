const commonValidator = require('@Library/extensions/commonValidator');
const { InputError } = require('@Library/extensions/ApiError');
const messages = require('@Library/message-resources');

async function CommonValidation(csvData, fileKey, operation) {
  const err = new InputError();
  // const getDepartmentList = await GetDepartmentByList(connection);
  // const getPackNameList = await GetPackNameByList(connection);
  // const getPaymentMerchantList = await GetPaymentMerchantByList(connection);


  // if (!commonValidator.isValidNumber(operation)) {
  //   err.addFieldError('type', messages.E0000029);
  // } else if (!commonValidator.isNumRangeValueValid(operation, 0, 1)) {
  //   err.addFieldError('type', { ...messages.E0000010, minVal: 0, maxVal: 1 });
  // }

  // csvData.forEach((row, index) => {
  //   const currRow = index + 1;
  //   const rowVals = Object.values(row);
  //   for (let i = 0; i < rowVals.length - 1; i += 1) {
  //     const col = rowVals[i];
  //     if (i === 0) {
  //       if (!commonValidator.isStringValidDate(col)) {
  //         err.addFieldError(`${fileKey}_row_${currRow}`, messages.E0000004);
  //         break;
  //       }
  //     } else if (!commonValidator.isValidNumber(col)) {
  //       err.addFieldError(`${fileKey}_row_${currRow}`, messages.E0000029);
  //       break;
  //     }
  //   }
  // });
  return err;
}

async function ValidateStaffList(csvData, fileKey, operation) {
  const err = await CommonValidation(csvData, fileKey, operation);
  if (err.hasError()) {
    return err;
  }
  // if (templateHeader.length !== headVal.length) {
  //   err.addFieldError(fileKey, messages.E0000045);
  // }
  return err;
}
module.exports = {
  ValidateStaffList,
  CommonValidation,
};
