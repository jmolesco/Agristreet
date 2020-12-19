module.exports = {
  E0000001: { errorCode: 'E0000001', errorMessage: 'User session invalid or expired.' },
  E0000002: { errorCode: 'E0000002', errorMessage: 'Unauthorized ' },
  E0000003: { errorCode: 'E0000003', errorMessage: 'Required' },
  E0000004: { errorCode: 'E0000004', errorMessage: 'Invalid date' },
  E0000005: { errorCode: 'E0000005', errorMessage: 'Invalid email' },
  E0000006: { errorCode: 'E0000006', errorMessage: 'Duplicate line account' },
  E0000007: { errorCode: 'E0000007', errorMessage: 'Duplicate email' },
  E0000008: { errorCode: 'E0000008', errorMessage: 'Invalid login' },
  E0000009: { errorCode: 'E0000009', errorMessage: 'Invalid length' },
  E0000010: { errorCode: 'E0000010', errorMessage: 'Invalid number range' },
  E0000011: { errorCode: 'E0000011', errorMessage: 'Event date already exists' },
  E0000012: { errorCode: 'E0000012', errorMessage: 'Invalid time' },
  E0000013: { errorCode: 'E0000013', errorMessage: 'Event Id does not exists' },
  E0000014: { errorCode: 'E0000014', errorMessage: 'Workshop Id does not exists' },
  E0000015: { errorCode: 'E0000015', errorMessage: 'Event Schedule Id does not exists' },
  E0000016: { errorCode: 'E0000016', errorMessage: 'Active bookings exists' },
  E0000017: { errorCode: 'E0000017', errorMessage: 'Workshop capacity should be less or equal event schedule capacity' },
  E0000018: { errorCode: 'E0000018', errorMessage: 'Input is not a valid hiragana' },
  E0000019: { errorCode: 'E0000019', errorMessage: 'Target data does not exists.' },
  E0000020: { errorCode: 'E0000020', errorMessage: 'Invalid acess.' },
  E0000021: { errorCode: 'E0000021', errorMessage: 'Schedule to should be greater than or equal Schedule from ' },
  E0000022: { errorCode: 'E0000022', errorMessage: 'Event Schedule already exists. ' },
  E0000023: { errorCode: 'E0000023', errorMessage: 'Workshop Schedule already exists. ' },
  E0000024: { errorCode: 'E0000024', errorMessage: 'Workshop Schedule not available.' },
  E0000025: { errorCode: 'E0000025', errorMessage: 'Workshop Schedule must be later.' },
  E0000026: { errorCode: 'E0000026', errorMessage: 'Event Schedule must be later.' },
  E0000027: { errorCode: 'E0000027', errorMessage: 'Event Schedule not available.' },
  E0000028: { errorCode: 'E0000028', errorMessage: 'Error occured, please contact admin' },
  E0000029: { errorCode: 'E0000029', errorMessage: 'Input is not a valid number' },
  E0000030: { errorCode: 'E0000030', errorMessage: 'No available schedule left.' },
  E0000031: { errorCode: 'E0000031', errorMessage: 'Invalid age' },
  E0000032: { errorCode: 'E0000032', errorMessage: 'Invalid referral code' },
  E0000033: { errorCode: 'E0000033', errorMessage: 'Invalid coupon code' },
  E0000034: { errorCode: 'E0000034', errorMessage: 'Has already booking for today.' },
  E0000035: { errorCode: 'E0000035', errorMessage: 'Input is not a valid katakana' },
  E0000036: { errorCode: 'E0000036', errorMessage: 'Input is not a valid alphabet' },
  E0000037: { errorCode: 'E0000037', errorMessage: 'Input is not a valid half width katakana' },
  E0000038: { errorCode: 'E0000038', errorMessage: 'Attendance Status already verified' },
  E0000039: { errorCode: 'E0000039', errorMessage: 'Exhibition has no slot available.' },
  E0000040: { errorCode: 'E0000040', errorMessage: 'Workshop has no slot available.' },
  E0000041: { errorCode: 'E0000041', errorMessage: 'Invalid booking token' },
  E0000042: { errorCode: 'E0000042', errorMessage: 'Input is has special characters' },
  E0000043: { errorCode: 'E0000043', errorMessage: 'No Cinema schedule available' },

  // TonariwaAPI Error Codes
  S404: { errorCode: 'S404', errorMessage: 'Invalid Tonariwa ID' },
  S403: { errorCode: 'S403', errorMessage: 'Internal Server Error.' }, // no access on tonariwa api
  S500: { errorCode: 'S500', errorMessage: 'Internal Server Error.' },
  E30001: { errorCode: 'E30001', errorMessage: 'Invalid Tonariwa ID' },
  E30005: { errorCode: 'E30005', errorMessage: 'Invalid Tonariwa ID' },
  E30006: { errorCode: 'E30006', errorMessage: 'Invalid URL' },

  // Workshop Title Codes
  W0001: { workshopCode: 'W0001', workshopTitle: '刺繍のアトリエ モンテックス' },
  W0002: { workshopCode: 'W0002', workshopTitle: 'ハイジュエリー アトリエ' },
  W0003: { workshopCode: 'W0003', workshopTitle: 'N°5 ボードリュシャージ' },
  W1001: { workshopCode: 'W1001', workshopTitle: 'Participative workshop with embroiderer MONTEX' },
  W1002: { workshopCode: 'W1002', workshopTitle: 'High Jewelry Atelier' },
  W1003: { workshopCode: 'W1003', workshopTitle: 'N°5 - Baudruchage workshop' },


  /** *****
   * START OF POITORE DEV
   *
   */

  P0001: { errorCode: 'P0001', errorMessage: 'Record already exist.' },
  P0002: { errorCode: 'P0002', errorMessage: 'Record is already favorited.' },
  P0003: { errorCode: 'P0003', errorMessage: 'Insufficient balance.' },
  P0004: { errorCode: 'P0004', errorMessage: 'Account already exist.' },
  P0005: { errorCode: 'P0005', errorMessage: 'Payment Merchant does not exist.' },
  P0006: { errorCode: 'P0006', errorMessage: 'Staff does not exist.' },
  P0007: { errorCode: 'P0007', errorMessage: 'Invalid Account.' },
  P0008: { errorCode: 'P0008', errorMessage: 'Insufficient points balance.' },

  /******
   * 
   * START OF AGRISTREET
   * 12/19/2020
   * 
   */


  LMS00001: { errorCode: 'LMS00001', errorMessage: 'Leading and Trailing Spaces' },
  LMS00002: { errorCode: 'LMS00002', errorMessage: 'Record already exist.' },
  LMS00003: { errorCode: 'LMS00003', errorMessage: 'Confirm Password should be the same with Password' },
  LMS00004: { errorCode: 'LMS00004', errorMessage: 'Username already exist.' },
  LMS00005: { errorCode: 'LMS00005', errorMessage: 'Email Address already exist.' },
  LMS00006: { errorCode: 'LMS00006', errorMessage: 'Username or Password is incorrect. Try again!' },
  LMS00007: { errorCode: 'LMS00007', errorMessage: 'Invalid video format. Only allows mp4, webm & ogg' },

};


