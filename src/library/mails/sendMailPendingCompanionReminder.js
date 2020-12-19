/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const helpers = require('@Library/helpers');
const pendingCompanionReminderMail = require('./templates/BookingCompanionReminder-template');
const pendingCompanionReminderNotif = require('./templates/BookingCompanionReminder-LINE-template');

module.exports = async (
  toEmail,
  first_name,
  last_name,
  createdAt,
  eventDate,
  time_from,
  time_to,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  total_buddies,
  pending_buddies,
  language,
  referralCode,
  src,
  tonariwaId) => {
  let expirationDate;
  let contentBody;
  let workshopDetails;
  let companionDetails;
  let referralDetails;
  let formattedEventDate;
  let subject;
  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;
  const referralUrl = helpers.formatReferralURL(referralCode, src === AccessSrc.MOBILE);

  if (language === Languages.JP) {
    subject = pendingCompanionReminderMail.jpSubject;
    formattedEventDate = helpers.formatDateToString(helpers.getLocalDate(eventDate), 'YYYY年MM月DD日 (ddd)', 'ja');
    expirationDate = helpers.formatDateToString(helpers.getLocalDate(createdAt), 'YYYY年MM月DD日 (ddd) hh:mm A', 'ja');
    companionDetails = `予約人数：${total_buddies}人

▼ご同伴者様の予約状況
予約が確定していない人数：${pending_buddies}人`;

    if (src === AccessSrc.LINE) {
      contentBody = pendingCompanionReminderNotif.jpBody;
    } else {
      contentBody = pendingCompanionReminderMail.jpBody;
    }

    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
ワークショップ時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'ワークショップ時間: なし';
    }

    if (referralCode) {
      referralDetails = `ご同伴者様へ下記のURLを${src === AccessSrc.MOBILE ? '' : 'LINEで'}送付ください。
下記のURLからQRコードチケットを発行いただきご同伴者様の予約が完了します。
${referralUrl} `;
    }
  } else {
    subject = pendingCompanionReminderMail.enSubject;
    formattedEventDate = helpers.formatDateToString(helpers.getLocalDate(eventDate), 'YYYY/MM/DD (ddd)');
    expirationDate = helpers.formatDateToString(helpers.getLocalDate(createdAt), 'YYYY/MM/DD (ddd) hh:mm A');
    companionDetails = `Number of people： ${total_buddies}
    
▼Number of guests who have not completed their reservation: ${pending_buddies}`;

    if (src === AccessSrc.LINE) {
      contentBody = pendingCompanionReminderNotif.enBody;
    } else {
      contentBody = pendingCompanionReminderMail.enBody;
    }

    if (workshopTitle) {
      workshopDetails = `Workshop Name：${workshopTitle}`;
    } else {
      workshopDetails = 'Workshop Name: None';
    }

    if (referralCode) {
      referralDetails = `${src === AccessSrc.MOBILE ? '' : 'LINE '}URL for accompanying guests：${src === AccessSrc.MOBILE ? `<a href="${referralUrl}">Click here</a>` : `${referralUrl}`}
Valid date for guest/s reservation: ${expirationDate}

※Notice※
Your accompanying guest(s) must register from the above URL and receive a QR code ticket after completing the reservation.`;
    }
  }

  const mailData = {
    first_name,
    last_name,
    formattedEventDate,
    formattedEventTime,
    workshopDetails,
    companionDetails,
    referralDetails,
    expirationDate,
  };


  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
