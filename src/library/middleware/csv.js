/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');
const { parseJsonFromCSV } = require('@Library/extensions/CSVGenerator');
const resources = require('@Library/message-resources');
const { InputError } = require('@Library/extensions/ApiError');

const upload = multer({ dest: 'tmp/csv/' });

async function CSVMiddleware(req, res, fileKey, fileMap, ignoreHeader) {
  const fileUpload = upload.single(fileKey);
  return new Promise(resolve => fileUpload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
      return res.status(400).json({ success: false });
    } if (err) {
      console.log(err);
      // An unknown error occurred when uploading.
      return res.status(400).json({ success: false });
    }

    try {
      const data = await parseJsonFromCSV(req[fileKey], ignoreHeader || req.body.ignoreHeader, fileMap, fileKey);
      const extension = req[fileKey].originalname.split('.');
      if (extension[extension.length - 1] !== 'csv') {
        const iErr = new InputError();
        iErr.addFieldError(fileKey, resources.E0000044);
        throw iErr;
      } else {
        resolve(data);
      }
    } catch (e) { return res.status(400).json({ success: false, ...e }); }
  }));
}

module.exports = CSVMiddleware;
