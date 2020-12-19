const jwt = require('jsonwebtoken');
const moment = require('moment');
const crypto = require('crypto');
const config = require('./config');
const messages = require('./message-resources');

/**
 *
 * @param {Data} payload Contains data to be embed on token
 * @description Generates jwt token
 */
const createToken = (payload, ignoreExp = false) => {
  let expire = {};
  let tokenExpiration = 0;
  if (!ignoreExp) {
    expire = { expiresIn: `${config.TOKEN_EXPIRATION}h` };
    tokenExpiration = config.TOKEN_EXPIRATION;
  }
  const data = jwt.sign(payload, config.SECRET_KEY, expire);
  return { data, tokenExpiration };
};

/**
 *
 * @param {String} token Jwt Token
 * @description Verify if token is valid
 */
const verifyToken = (token, ignoreExp) => {
  const options = {};
  if (ignoreExp) {
    options.ignoreExpiration = true;
  }
  return jwt.verify(token, config.SECRET_KEY, options);
};

/**
 *
 * @param {Date} date Date to be formatted
 * @description Format date to string
 */
const formatDateToString = (date, format, locale) => moment(date, null, locale, null)
  .format(format || config.DATE_FORMAT);

const formatDateTimeToString = date => moment(date).format(`${config.DATE_FORMAT} ${config.TIME_FORMAT}`);

const formatDateTimeToStringPH = date => moment(date).format(`${config.DATE_FORMAT} ${config.TIME_FORMAT}`);

const formatDateTimeInSQLToString = (date) => {
  if (date === null) {
    return date;
  }
  return moment(date).format(`${config.DATE_FORMAT}`);
};
const formatDateTimeInMYSQLToString = (date) => { // THIS IS USE FOR SAVING IN MYSQL DATE OTHERWISE YOUR INSERTION WILL NOT WORK
  if (date === null) {
    return date;
  }
  return moment(date).format(`${config.DATE_YEAR_MM_FORMAT}`);
};
const formateTimeToString = (time, currentFormat) => moment(time, currentFormat || 'HH:mm:ss').local().format(config.TIME_FORMAT);

const convertStringToDate = date => moment(date, 'MM-DD-YYYY').local().toDate();

const convertStringToDateTime = (date, time) => moment(`${date} ${time}`, 'MM-DD-YYYY HH:mm:ss').local().toDate();

const convertStringToSHA256 = str => crypto.createHash('sha256').update(str).digest('hex');

const checkIfDateEqual = (d1, d2) => moment(d1).local().isSame(moment(d2).local(), 'day');

const isDateGreaterEqual = (d1, d2) => moment(d1).local().isSameOrAfter(moment(d2).local(), 'day');

const isTimeGreater = (t1, t2) => moment(t1, 'HH:mm:ss').local().isAfter(moment(t2, 'HH:mm:ss').local(), 'minutes');

const isTimeLess = (t1, t2) => moment(t1, 'HH:mm:ss').local().isBefore(moment(t2, 'HH:mm:ss').local(), 'minutes');

const isTimeLessEqual = (t1, t2) => moment(t1, 'HH:mm:ss').local().isSameOrBefore(moment(t2, 'HH:mm:ss').local(), 'minutes');

const addMinsToTime = (t1, mins) => moment(t1, 'HH:mm:ss').local().add(mins, 'minute');

const getLocalDate = date => moment(date || new Date()).local().toDate();

const formatReferralURL = (refCode, forMobile = true) => ` ${(forMobile
  ? config.REFERRAL_URL : config.REFERRAL_URL_LINE)}${refCode}`;

const formatBookingURL = (bookingCode, forMobile = true) => (forMobile
  ? `${config.BOOKING_DETAIL_URL}?token=${bookingCode}` : config.REFERRAL_URL_LINE);

const formatQRContent = (bookingCode, forMobile = true) => (forMobile
  ? `${config.BOOKING_DETAIL_URL}?token=${bookingCode}` : `${config.REFERRAL_URL_LINE}&token=${bookingCode}`);

function getPropertyName(id, lang) {
  if (id) {
    return messages[`W${lang}${id.toString().padStart(3, '0')}`].workshopTitle;
  }
  return null;
}

module.exports = {
  createToken,
  verifyToken,
  formatDateToString,
  formateTimeToString,
  formatDateTimeToString,
  formatReferralURL,
  formatBookingURL,
  convertStringToDate,
  convertStringToDateTime,
  convertStringToSHA256,
  checkIfDateEqual,
  isDateGreaterEqual,
  isTimeGreater,
  getLocalDate,
  addMinsToTime,
  isTimeLessEqual,
  isTimeLess,
  formatQRContent,
  getPropertyName,
  formatDateTimeInSQLToString,
  formatDateTimeToStringPH,
  formatDateTimeInMYSQLToString,
};
