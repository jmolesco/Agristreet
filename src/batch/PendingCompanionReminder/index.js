/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repo = require('@Library/repository')();
const sendMailPendingCompanionReminder = require('@Library/mails/sendMailPendingCompanionReminder');
const helpers = require('@Library/helpers');

(async function main() {
  const parentBooking = await repo.BookingBuddiesRepository.GetBookingWithCompanionForReminder();
  if (parentBooking.length > 0) {
    const mailSender = parentBooking.map(async (booking) => {
      await sendMailPendingCompanionReminder(
        booking.email,
        booking.first_name,
        booking.last_name,
        booking.referralExpiration,
        booking.schedule_date,
        helpers.formateTimeToString(booking.time_from),
        helpers.formateTimeToString(booking.time_to),
        helpers.getPropertyName(booking.workshop_id, booking.language),
        helpers.formateTimeToString(booking.workshop_time_from),
        helpers.formateTimeToString(booking.workshop_time_to),
        booking.total + 1,
        booking.pending_buddies,
        booking.language,
        booking.coupon_code,
        booking.booking_src,
        booking.tonariwaId,
      ).catch((err) => { throw err; });
      const referralCodes = parentBooking.map(r => r.coupon_code);
      await repo.BookingBuddiesRepository.UpdateBookingNotifReset(referralCodes);
    });
    await Promise.all(mailSender);
  }
  process.exit(0);
}());
