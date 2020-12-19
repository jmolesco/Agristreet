const coupon = require('coupon-code');
const helpers = require('../helpers');

function GenerateCoupons(count, existingCoupon) {
  const couponCodes = [];
  let counter = 0;
  do {
    const code = `${coupon.generate()}-${helpers
      .formatDateToString(new Date(), 'YYHH-ssSS')}`;
    if (!couponCodes.includes(code)) {
      if (!existingCoupon.includes(code)) {
        couponCodes.push(code);
        counter += 1;
      }
    }
  } while (counter !== count);
  return couponCodes;
}

module.exports = GenerateCoupons;
