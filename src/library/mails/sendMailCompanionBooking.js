/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const helpers = require('@Library/helpers');
const bookingCompanionMail = require('./templates/BookingCompanion-template');
const bookingCompanionNotif = require('./templates/BookingCompanion-LINE-template');

module.exports = async (
  toEmail,
  first_name,
  last_name,
  eventDate,
  time_from,
  time_to,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  total_buddies,
  pending_buddies,
  language,
  src) => {
  let contentBody;
  let workshopDetails;
  let companionDetails;
  let formattedEventDate;
  let subject;
  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;

  if (language === Languages.JP) {
    subject = bookingCompanionMail.jpSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY年MM月DD日 (ddd)', 'ja');
    companionDetails = `予約人数：${total_buddies}人
      残り人数：${pending_buddies}人`;

    if (src === AccessSrc.LINE) {
      contentBody = bookingCompanionNotif.jpBody;
    } else {
      contentBody = bookingCompanionMail.jpBody;
    }

    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
      時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'なし';
    }
  } else {
    subject = bookingCompanionMail.enSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY/MM/DD (ddd)');
    companionDetails = `Booked slot/s: ${total_buddies}
      Remaining slot/s:${pending_buddies}`;

    if (src === AccessSrc.LINE) {
      contentBody = bookingCompanionNotif.enBody;
    } else {
      contentBody = bookingCompanionMail.enBody;
    }

    if (workshopTitle) {
      workshopDetails = `Workshop Name：${workshopTitle}
      Time：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'None';
    }
  }

  const mailData = {
    first_name,
    last_name,
    formattedEventDate,
    formattedEventTime,
    workshopDetails,
    companionDetails,
  };


  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([toEmail], subject, contentBody, mailData);
};
