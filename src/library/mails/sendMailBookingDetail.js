/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const mailer = require('@Library/sendmail');
const { Languages, AccessSrc } = require('@Library/constants');
const config = require('@Library/config');
const helpers = require('@Library/helpers');
const bookingDetailMail = require('./templates/BookingDetails-template');
const bookingDetailNotif = require('./templates/BookingDetails-LINE-template');

module.exports = async (toEmail, last_name, first_name, eventDate,
  time_from,
  time_to,
  workshopTitle,
  workshopTimeFrom,
  workshopTimeTo,
  venue,
  base64File,
  referralCode,
  companionCnt,
  ticketUrl,
  language,
  src,
  tonariwaId) => {
  let contentBody;
  let workshopDetails = '';
  let formattedEventDate;
  let referralDetails = '';
  let subject;
  let venueDetails;
  let map;
  const formattedEventTime = `${time_from}`;
  const formattedWorkshopTime = `${workshopTimeFrom}`;
  const referralUrl = helpers.formatReferralURL(referralCode, src === AccessSrc.MOBILE);

  if (language === Languages.JP) {
    subject = bookingDetailMail.jpSubject;
    venueDetails = `${config.VENUE_JP}
    会場へのアクセス: ${config.GOOGLE_MAP_URL}`;

    if (src === AccessSrc.LINE) {
      contentBody = bookingDetailNotif.jpBody;
    } else {
      contentBody = bookingDetailMail.jpBody;
    }

    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY年MM月DD日 (ddd)', 'ja');

    if (workshopTitle) {
      workshopDetails = `ワークショップ名：${workshopTitle}
ワークショップ時間：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'ワークショップ時間： なし';
    }

    if (referralCode) {
      referralDetails = `人数： ${companionCnt} 人
※ご同伴者様の予約に関して※
ご同伴者様へ下記のURLを${src === AccessSrc.MOBILE ? '' : 'LINEで'}ご送付ください。
下記のURLからQRコードチケットを発行いただきご同伴者様の予約が完了します。
ご同伴者様用${src === AccessSrc.MOBILE ? '' : 'LINE'} URL：${referralUrl}`;
    }
  } else {
    subject = bookingDetailMail.enSubject;
    contentBody = bookingDetailMail.enBody;
    formattedEventDate = helpers.formatDateToString(new Date(eventDate), 'YYYY/MM/DD (ddd)');
    venueDetails = `${config.VENUE_EN}
${config.FULL_ADDRESS}`;

    if (src === AccessSrc.LINE) {
      contentBody = bookingDetailNotif.enBody;
      map = `Map: ${config.GOOGLE_MAP_URL}`;
    } else {
      contentBody = bookingDetailMail.enBody;
      map = `Map: <a href="${config.GOOGLE_MAP_URL}">Click here</a>`;
    }

    if (workshopTitle) {
      workshopDetails = `Workshop Name：${workshopTitle}
Time：${formattedWorkshopTime}`;
    } else {
      workshopDetails = 'Workshop Name：None';
    }

    if (referralCode) {
      referralDetails = `Number of people： ${companionCnt}
Please be reminded to ask your guests to ${src === AccessSrc.MOBILE ? 'confirm' : 'confirm or cancel'} their booking by accessing ${src === AccessSrc.MOBILE ? `the guest reservation link: <a href="${referralUrl}">Click here</a>.` : `the official CHANEL account on LINE: ${referralUrl}`}`;
    }
  }


  const mailData = {
    last_name,
    first_name,
    formattedEventDate,
    formattedEventTime,
    ticketUrl,
    referralDetails,
    workshopDetails,
    checkinUrl: config.CHECKIN_URL,
    venueDetails,
    map,
  };

  if (src === AccessSrc.MOBILE) {
    return mailer.sendTextMail({ name: `${last_name} ${first_name}`, email: toEmail.toLowerCase() }, subject, contentBody, mailData, language);
  }
  return mailer.sendPushNotif([tonariwaId], subject, contentBody, mailData);
};
