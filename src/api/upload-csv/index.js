/* eslint-disable import/no-extraneous-dependencies */
const CSVMiddleware = require('@Library/middleware/csv');
const { ValidateStaffList } = require('./validator');
const { HandleStaffCSV } = require('./handler');

const UploadCSVStaffList = async (req, res, next) => {
  const parseCsv = data => ({
    fname: data[0],
    mname: data[1],
    lname: data[2],
    packname: data[3],
    email: data[4],
    departmentname: data[5],
    departmentname2: data[6],
    gender: data[7],
    nationality: data[8],
    bday: data[9],
    tel_no: data[10],
    paymentmerchant: data[11],
    accountno: data[12],
    password: data[13],
  });

  const fileKey = 'file';
  const csvData = await CSVMiddleware(req, res, fileKey, parseCsv, false);
  const validationErr = await ValidateStaffList(csvData, fileKey, req.body.type);
  if (validationErr.hasError()) {
    return next(validationErr);
  }
  try {
    await HandleStaffCSV(csvData, req.body.type);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  UploadCSVStaffList,
};
