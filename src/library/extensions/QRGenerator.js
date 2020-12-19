const brandedQRCode = require('branded-qr-code');
const fs = require('fs');
const path = require('path');

async function GenerateQR(content, filename) {
  const dst = path.resolve(__dirname, `../../assets/images/${filename}.png`);
  const logo = path.resolve(__dirname, '../../assets/images/qr-logo-new.png');
  return new Promise((resolve, reject) => {
    fs.access(dst, fs.constants.F_OK, (err) => {
      if (!err) {
        const imageAsBase64 = fs.readFileSync(dst);
        resolve(imageAsBase64.toString('base64'));
      } else {
        brandedQRCode.generate({
          text: content,
          path: logo,
          opt: { width: '250', errorCorrectionLevel: 'M', margin: 2 },
        })
          .then((data) => {
            fs.writeFile(dst, data, (errQr) => {
              const base64Data = Buffer.from(data).toString('base64');
              if (errQr) {
                reject(errQr);
              }
              resolve(base64Data);
            });
          })
          .catch((errGenerate) => {
            reject(errGenerate);
          });
      }
    });
  });
}

async function GetQrFile(filename) {
  const dst = path.resolve(__dirname, `../../assets/images/${filename}.png`);
  return new Promise((resolve, reject) => {
    fs.access(dst, fs.constants.F_OK, (err) => {
      if (!err) {
        const imageAsBase64 = fs.readFileSync(dst);
        resolve(imageAsBase64.toString('base64'));
      }
      reject(new Error('Not Found'));
    });
  });
}

module.exports = GenerateQR;
module.exports.GetQrFile = GetQrFile;
