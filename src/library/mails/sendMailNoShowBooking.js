/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const config = require('@Library/config');
const helpers = require('@Library/helpers');
const { Languages, AccessSrc } = require('@Library/constants');
const noShowMail = require('./templates/BookingNoShow-template');
const noShowNotif = require('./templates/BookingNoShow-LINE-template');

module.exports = async (toEmail, last_name, first_name, eventDate,
  time_from,
  time_to,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  language,
  src,
  tonariwaId,
) => {
  let contentBody;
  let workshopDetails;
  let formattedEventDate;
  let subject;
  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;

  if (language === Languages.JP) {
    subject = noShowMail.jpSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY年MM月DD日');

    if (src === AccessSrc.LINE) {
      contentBody = noShowNotif.jpBody;
    } else {
      contentBody = noShowMail.jpBody;
    }
    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
ワークショップ時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'ワークショップ時間: なし';
    }
  } else {
    subject = noShowMail.enSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY/MM/DD');

    if (src === AccessSrc.LINE) {
      contentBody = noShowNotif.enBody;
    } else {
      contentBody = noShowMail.enBody;
    }

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
    workshopDetails,
    formattedEventDate,
    formattedEventTime,
    registerUrl: src === AccessSrc.MOBILE ? config.REGISTER_URL : config.REFERRAL_URL_LINE,
  };

  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
