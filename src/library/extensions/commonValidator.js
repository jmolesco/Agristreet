/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment');
const config = require('@Library/config');

function isStringHasValue(value) {
  return value && !!value.toString().trim();
}
function isStringValidDate(value) {
  return moment(value, config.VALID_DATE_FORMAT, true).isValid();
}
function isStringValidTime(value) {
  return moment(value, config.VALID_TIME_FORMAT, true).isValid();
}
function isValidEmail(value) {
  // eslint-disable-next-line no-control-regex
  const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(value);
}
function isCharMaxLengthValid(value, max) {
  return value.length <= max;
}
function isCharMinLengthValid(value, min) {
  return value.length >= min;
}
function isCharRangeLengthValid(value, min, max) {
  return isCharMaxLengthValid(value, max) && isCharMinLengthValid(value, min);
}

function isNumMaxValueValid(value, max) {
  return value <= max;
}
function isNumMinValueValid(value, min) {
  return value >= min;
}
function isNumRangeValueValid(value, min, max) {
  return isNumMaxValueValid(value, max) && isNumMinValueValid(value, min);
}
function isStrValidHiragana(value) {
  let valid = true;
  [...value].forEach((char) => {
    if (!(char >= '\u3040' && char <= '\u309f')) {
      valid = false;
    }
  });
  return valid;
}
function isStrValidKatakana(value) {
  let valid = true;
  [...value].forEach((char) => {
    if (!(char >= '\u30a0' && char <= '\u30ff')) {
      valid = false;
    }
  });
  return valid;
}
function isStrValidHalfKatakana(value) {
  let valid = true;
  [...value].forEach((char) => {
    if (!(char >= '\uff00' && char <= '\uff9f')) {
      valid = false;
    }
  });
  return valid;
}


function isStrValidAlphabet(value) {
  // eslint-disable-next-line no-control-regex
  const re = /^[a-zA-Z0-9. ]+$/;
  return re.test(value);
}
function isValidNumber(value) {
  // eslint-disable-next-line no-control-regex
  const re = /^\d+$/;
  return re.test(value);
}
function isAgeValid(bday, validAge) {
  if (isStringValidDate(bday)) {
    return Math.abs(moment(bday, config.VALID_DATE_FORMAT, true).local().diff(moment(new Date()).local(), 'years')) >= validAge;
  }
  return false;
}
function isValidHalfOrFullKatakana(value) {
  let valid = true;
  [...value].forEach((char) => {
    if (!(
      (char >= '\u30a0' && char <= '\u30ff')
      || (char >= '\uff00' && char <= '\uff9f')
      || (char === '　')
    )
    ) {
      valid = false;
    }
  });
  return valid;
}

function noENSpecialChars(value) {
// eslint-disable-next-line no-control-regex
  const re = /[[:punct:]]/gm;
  return !re.test(value);
}

function noJpSpecialChars(value) {
  const re = /[＀ ！＂＃＄％＆＇（）＊＋，－．：；＜＝＞？＾／]/gm;
  return !re.test(value);
}

module.exports = {
  isStringHasValue,
  isStringValidDate,
  isValidEmail,
  isCharMaxLengthValid,
  isCharMinLengthValid,
  isCharRangeLengthValid,
  isNumMaxValueValid,
  isNumMinValueValid,
  isNumRangeValueValid,
  isStringValidTime,
  isStrValidHiragana,
  isStrValidKatakana,
  isStrValidHalfKatakana,
  isStrValidAlphabet,
  isValidNumber,
  isAgeValid,
  isValidHalfOrFullKatakana,
  noENSpecialChars,
  noJpSpecialChars,
};
