/* eslint-disable import/no-extraneous-dependencies */

const { InputError } = require('@Library/extensions/ApiError');

const types = require('./types');
const checker = require('./checker');

module.exports = schema => (values) => {
  const errors = new InputError();

  Object.keys(schema).forEach((field) => {
    const validations = schema[field];
    for (let c = 0; c < validations.length; c += 1) {
      if (errors.hasFieldError(field)) {
        break;
      }
      const vVal = validations[c];
      const vKeys = Object.keys(vVal);
      for (let i = 0; i < vKeys.length; i += 1) {
        const vKey = vKeys[i];
        if (Object.prototype.hasOwnProperty.call(vVal, vKey)) {
          switch (vKey) {
            case types.REQUIRED:
              errors.addFieldError(field, checker.required(
                values[field] || undefined,
                vVal[vKey],
              ));
              break;
            case types.NUMBER:
              errors.addFieldError(field, checker.number(values[field], vVal[vKey]));
              break;
            case types.EMAIL:
              errors.addFieldError(field, checker.email(values[field], vVal[vKey]));
              break;
            case types.MAXLENGTH:
              errors.addFieldError(field, checker.maxLength(values[field], vVal[vKey]));
              break;
            case types.MINLENGTH:
              errors.addFieldError(field, checker.minLength(values[field], vVal[vKey]));
              break;
            case types.CHARRANGE:
              errors.addFieldError(field, checker.charRange(values[field], vVal[vKey]));
              break;
            case types.MAXVALUE:
              errors.addFieldError(field, checker.maxValue(values[field], vVal[vKey]));
              break;
            case types.MINVALUE:
              errors.addFieldError(field, checker.minValue(values[field], vVal[vKey]));
              break;
            case types.DATE:
              errors.addFieldError(field, checker.date(values[field], vVal[vKey]));
              break;
            case types.TIME:
              errors.addFieldError(field, checker.time(values[field], vVal[vKey]));
              break;
            case types.NUMRANGE:
              errors.addFieldError(field, checker.numRange(values[field], vVal[vKey]));
              break;
            case types.HIRAGANA:
              errors.addFieldError(field, checker.hiragana(values[field], vVal[vKey]));
              break;
            case types.AGE:
              errors.addFieldError(field, checker.age(values[field], vVal[vKey]));
              break;
            case types.KATAKANA:
              errors.addFieldError(field, checker.katakana(values[field], vVal[vKey]));
              break;
            case types.HALFKATAKANA:
              errors.addFieldError(field, checker.halfkatakana(values[field], vVal[vKey]));
              break;
            case types.ALPHABET:
              errors.addFieldError(field, checker.alphabet(values[field], vVal[vKey]));
              break;
            case types.FULLORHALFKATAKANA:
              errors.addFieldError(field, checker.fullORHalfKatakana(values[field], vVal[vKey]));
              break;
            case types.NOENSPECIALCHARS:
              errors.addFieldError(field, checker.noEnSpecialChars(values[field], vVal[vKey]));
              break;
            case types.NOJPSPECIALCHARS:
              errors.addFieldError(field, checker.noJpSpecialChars(values[field], vVal[vKey]));
              break;
            case types.LEADINGANDTRAILINGSPACES:
              errors.addFieldError(field, checker.leadingAndTrailing(values[field], vVal[vKey]));
              break;
            default:
              break;
          }
        }
        if (errors[field]) {
          break;
        }
      }
    }
  });
  return errors;
};