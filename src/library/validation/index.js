const FieldCheck = require('./fieldCheck');
const SchemaValidator = require('./schemaValidator');
const CheckType = require('./types');

const CheckRequired = () => FieldCheck(CheckType.REQUIRED);
const CheckEmailFormat = () => FieldCheck(CheckType.EMAIL);
const CheckMaxLength = maxLength => FieldCheck(CheckType.MAXLENGTH, { max: maxLength });
const CheckMinLength = minLength => FieldCheck(CheckType.MINLENGTH, { min: minLength });
const CheckMaxValue = maxValue => FieldCheck(CheckType.MAXVALUE, { max: maxValue });
const CheckMinValue = minValue => FieldCheck(CheckType.MINVALUE, { min: minValue });
const CheckDateValue = () => FieldCheck(CheckType.DATE);
const CheckTimeValue = () => FieldCheck(CheckType.TIME);
const CheckHiraganaValue = () => FieldCheck(CheckType.HIRAGANA);
const CheckKatakanaValue = () => FieldCheck(CheckType.KATAKANA);
const CheckHalfKatakanaValue = () => FieldCheck(CheckType.HALFKATAKANA);
const CheckAlphabetValue = () => FieldCheck(CheckType.ALPHABET);
const CheckNumberValue = () => FieldCheck(CheckType.NUMBER);
const CheckCharRange = (minLength, maxLength) => FieldCheck(CheckType.CHARRANGE,
  { min: minLength, max: maxLength });
const CheckNumRange = (minVal, maxVal) => FieldCheck(CheckType.CHARRANGE,
  { min: minVal, max: maxVal });
const CheckAge = validAge => FieldCheck(CheckType.AGE, { validAge });
const CheckFullORHalfKatakana = () => FieldCheck(CheckType.FULLORHALFKATAKANA);
const CheckNoJpSpecialChars = () => FieldCheck(CheckType.NOJPSPECIALCHARS);
const CheckNoEnSpecialChars = () => FieldCheck(CheckType.NOENSPECIALCHARS);

module.exports = {
  SchemaValidator,
  CheckRequired,
  CheckEmailFormat,
  CheckMaxLength,
  CheckMinLength,
  CheckMaxValue,
  CheckMinValue,
  CheckDateValue,
  CheckCharRange,
  CheckNumRange,
  CheckTimeValue,
  CheckHiraganaValue,
  CheckKatakanaValue,
  CheckHalfKatakanaValue,
  CheckAlphabetValue,
  CheckNumberValue,
  CheckAge,
  CheckFullORHalfKatakana,
  CheckNoJpSpecialChars,
  CheckNoEnSpecialChars,
};
