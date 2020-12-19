/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const config = require('@Library/config');
const helpers = require('@Library/helpers');
const bookingReminderMail = require('./templates/BookingReminder-template');
const bookingReminderNotif = require('./templates/BookingReminder-LINE-template');

module.exports = async (
  toEmail,
  last_name,
  first_name,
  eventDate,
  time_from,
  time_to,
  pending_buddies,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  venue,
  referralCode,
  language,
  bookingToken,
  src,
  tonariwaId) => {
  let contentBody;
  let workshopDetails;
  let referralDetails;
  let formattedEventDate;
  let subject;
  let venueDetails;
  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;
  const referralUrl = helpers.formatReferralURL(referralCode, src === AccessSrc.MOBILE);

  if (language === Languages.JP) {
    subject = bookingReminderMail.jpSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY年MM月DD日 (ddd)', 'ja');
    venueDetails = `${config.VENUE_JP}
    会場へのアクセス: ${config.GOOGLE_MAP_URL}`;

    if (src === AccessSrc.LINE) {
      contentBody = bookingReminderNotif.jpBody;
    } else {
      contentBody = bookingReminderMail.jpBody;
    }
    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
ワークショップ時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'ワークショップ時間: なし';
    }

    if (referralCode) {
      referralDetails = `人数： ${pending_buddies} 人
※ご同伴者様の予約に関して※
ご同伴者様がご予約を完了されていない場合、同伴入場は確約いたしかねますので予めご了承ください。`;
    }
  } else {
    subject = bookingReminderMail.enSubject;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY/MM/DD (ddd)');

    if (src === AccessSrc.LINE) {
      contentBody = bookingReminderNotif.enBody;
    } else {
      contentBody = bookingReminderMail.enBody;
    }
    if (workshopTitle) {
      workshopDetails = `Workshop Name：${workshopTitle}
Time：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'Workshop Name：None';
    }

    if (referralCode) {
      referralDetails = `Number of people： ${pending_buddies}
Please be reminded to ask your guests to ${src === AccessSrc.MOBILE ? 'confirm' : 'confirm or cancel'} their booking by accessing ${src === AccessSrc.MOBILE ? `the guest reservation link: <a href="${referralUrl}">Click here</a>.` : `the official CHANEL account on LINE: ${referralUrl}`}`;
    }
  }

  const mailData = {
    last_name,
    first_name,
    formattedEventDate,
    formattedEventTime,
    ticketUrl: helpers.formatBookingURL(bookingToken, src === AccessSrc.MOBILE),
    referralDetails,
    workshopDetails,
    checkinUrl: config.CHECKIN_URL,
    venueDetails,
    downloadUrl: config.DOWNLOAD_URL,
  };

  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
