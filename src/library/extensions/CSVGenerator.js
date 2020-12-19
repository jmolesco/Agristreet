const { parseAsync } = require('json2csv');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const resources = require('@Library/message-resources');
const { InputError } = require('@Library/extensions/ApiError');


async function parseJsonToCSV(jsonData, arrHeaders, filename) {
  return new Promise((resolve, reject) => {
    parseAsync(jsonData, { fields: arrHeaders })
      .then((csvData) => {
        const fname = `${filename}.csv`;
        const filePath = path.resolve(__dirname, `../../assets/csv/${fname}`);
        fs.writeFile(filePath, csvData, ((err) => {
          if (err) {
            reject(err);
          }
          resolve(fname);
        }));
      })
      .catch((err) => { console.log(err); reject(err); });
  });
}
async function parseJsonFromCSV(file, ignoreHeader = false, parserFormat, fieldKey) {
  return new Promise((resolve, reject) => {
    const fileRows = [];
    // open uploaded file
    csv.parseFile(file.path)
      .transform((data, cb) => {
        const vals = Object.values(data);
        return setImmediate(() => cb(null, parserFormat(vals)));
      })
      .on('data', (data) => {
        fileRows.push(data); // push each row
      })
      .on('end', () => {
        fs.unlinkSync(file.path); // remove temp file
        if (JSON.parse(ignoreHeader)) {
          fileRows.shift();
        }
        resolve(fileRows);
      })
      .on('error', (error) => {
        console.log(error);
        const err = new InputError();
        err.addFieldError(fieldKey, resources.E0000044);
        reject(err);
      });
  });
}

module.exports = {
  parseJsonToCSV,
  parseJsonFromCSV,
};
