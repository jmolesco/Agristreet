/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const config = require('@Library/config');
const bookingConfirmMail = require('./templates/BookingConfirm-template');
const bookingConfirmNotif = require('./templates/BookingConfirm-LINE-template');

module.exports = async (
  toEmail,
  first_name,
  last_name,
  language,
  src,
  tonariwaId) => {
  let contentBody;
  let subject;

  if (language === Languages.JP) {
    subject = bookingConfirmMail.jpSubject;

    if (src === AccessSrc.LINE) {
      contentBody = bookingConfirmNotif.jpBody;
    } else {
      contentBody = bookingConfirmMail.jpBody;
    }
  } else {
    subject = bookingConfirmMail.enSubject;

    if (src === AccessSrc.LINE) {
      contentBody = bookingConfirmNotif.enBody;
    } else {
      contentBody = bookingConfirmMail.enBody;
    }
  }

  const mailData = {
    questionUrl: config.QUESTIONNAIRE_URL,
    first_name,
    last_name,
  };

  if (src === AccessSrc.MOBILE || src === AccessSrc.IPAD) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
