const nodemailer = require('nodemailer');
const config = require('./config');

function configAWS() {
  const info = {
    host: config.SERVERNAME,
    port: config.EMAILPORT,
    secure: true,
    requireTLS: true,
    auth: {
      user: config.SMTP_USERNAME, // generated ethereal user
      pass: config.SMTP_PASSWORD, // generated ethereal password
    },
  };
  const transporter = nodemailer.createTransport(info);
  return transporter;
}

function sendEmail(cEmail, subject, htmlBody) {
  return new Promise(async (resolve, reject) => {
    const transporter = configAWS();
    transporter.sendMail({
      from: config.SENDGRID_MAIL_FROM,
      to: cEmail,
      subject,
      html: htmlBody,
    }).then(async () => {
      resolve(true);
    }).catch(async (error) => {
      reject(error);
    });
  });
}
module.exports = {
  sendEmail,
};
