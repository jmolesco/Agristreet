/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const config = require('@Library/config');
const helpers = require('@Library/helpers');
const bookingCancelMail = require('./templates/BookingCancel-template');
const bookingCancelNotif = require('./templates/BookingCancel-LINE-template');

module.exports = async (
  toEmail,
  last_name,
  first_name,
  eventDate,
  time_from,
  time_to,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  language,
  // eslint-disable-next-line no-unused-vars
  ticketUrl,
  src,
  tonariwaId) => {
  let contentBody;
  let workshopDetails;
  let formattedEventDate;
  let subject;

  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;

  if (language === Languages.JP) {
    subject = bookingCancelMail.jpSubject;

    if (src === AccessSrc.LINE) {
      contentBody = bookingCancelNotif.jpBody;
    } else {
      contentBody = bookingCancelMail.jpBody;
    }

    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY年MM月DD日');
    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
ワークショップ時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'ワークショップ時間: なし';
    }
  } else {
    subject = bookingCancelMail.enSubject;

    if (src === AccessSrc.LINE) {
      contentBody = bookingCancelNotif.enBody;
    } else {
      contentBody = bookingCancelMail.enBody;
    }

    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY/MM/DD');
    if (workshopTitle) {
      workshopDetails = `Workshop Name：${workshopTitle}
Time：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'Workshop Name：None';
    }
  }

  const mailData = {
    last_name,
    first_name,
    formattedEventDate,
    formattedEventTime,
    workshopDetails,
    registerUrl: src === AccessSrc.MOBILE ? config.REGISTER_URL : config.REFERRAL_URL_LINE,
  };

  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
