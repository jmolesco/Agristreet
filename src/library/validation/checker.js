/* eslint-disable import/no-extraneous-dependencies */

const commonValidator = require('@Library/extensions/commonValidator');
const messages = require('@Library/message-resources');

module.exports = {
  required: value => ((!commonValidator.isStringHasValue(value)) ? messages.E0000003 : undefined),

  email: value => (commonValidator.isStringHasValue(value) && !commonValidator.isValidEmail(value)
    ? messages.E0000005
    : undefined),

  maxLength: (value, { max } = {}) => (!commonValidator.isCharMaxLengthValid(value, max)
    ? { ...messages.E0000009, maxLength: max } : undefined),

  minLength: (value, { min } = {}) => (!commonValidator.isCharMinLengthValid(value, min)
    ? { ...messages.E0000009, minLength: min } : undefined),

  charRange: (value, { max, min } = {}) => (!commonValidator.isCharRangeLengthValid(value, min, max)
    ? { ...messages.E0000009, maxLength: max, minLength: min } : undefined),

  date: value => (commonValidator.isStringHasValue(value)
    && !commonValidator.isStringValidDate(value) ? { ...messages.E0000004 } : undefined),

  time: value => (commonValidator.isStringHasValue(value)
    && !commonValidator.isStringValidTime(value) ? { ...messages.E0000012 } : undefined),

  maxValue: (value, { max = 0 } = {}) => (!commonValidator.isNumMaxValueValid(value, max)
    ? { ...messages.E0000010, maxVal: max } : undefined),

  minValue: (value, { min = 0 } = {}) => (!commonValidator.isNumMinValueValid(value, min)
    ? { ...messages.E0000010, minVal: min } : undefined),

  numRange: (value, { max = 0, min = 0 } = {}) => (!commonValidator
    .isNumRangeValueValid(value, min, max)
    ? { ...messages.E0000010, maxVal: max, minVal: min } : undefined),
  hiragana: value => (!commonValidator
    .isStrValidHiragana(value)
    ? { ...messages.E0000018 } : undefined),
  katakana: value => (!commonValidator
    .isStrValidKatakana(value)
    ? { ...messages.E0000035 } : undefined),
  halfkatakana: value => (!commonValidator
    .isStrValidHalfKatakana(value)
    ? { ...messages.E0000037 } : undefined),
  alphabet: value => (!commonValidator
    .isStrValidAlphabet(value)
    ? { ...messages.E0000036 } : undefined),
  number: value => (!commonValidator
    .isValidNumber(value)
    ? { ...messages.E0000029 } : undefined),
  age: (value, { validAge = 18 } = {}) => (!commonValidator
    .isAgeValid(value, validAge)
    ? { ...messages.E0000031, validAge } : undefined),
  fullORHalfKatakana: value => (!commonValidator
    .isValidHalfOrFullKatakana(value)
    ? { ...messages.E0000042 } : undefined),
  noEnSpecialChars: value => (!commonValidator
    .noENSpecialChars(value)
    ? { ...messages.E0000036 } : undefined),
  noJpSpecialChars: value => (!commonValidator
    .noJpSpecialChars(value)
    ? { ...messages.E0000042 } : undefined),
  leadingAndTrailing: value => (commonValidator
    .hasLeadingAndTrailing(value)
    ? { ...messages.LMS00001 } : undefined),
};