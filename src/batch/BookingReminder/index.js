/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repo = require('@Library/repository')();
const sendMailBookingReminder = require('@Library/mails/sendMailBookingReminder');
const helpers = require('@Library/helpers');

(async function main() {
  const result = await repo.BookingRepository.GetActiveBookingForReminder();
  if (result.length > 0) {
    const mailSender = result.map(async (booking) => {
      await sendMailBookingReminder(booking.email,
        booking.last_name,
        booking.first_name,
        booking.schedule_date,
        helpers.formateTimeToString(booking.time_from),
        helpers.formateTimeToString(booking.time_to),
        booking.total + 1,
        helpers.getPropertyName(booking.workshop_id, booking.language),
        helpers.formateTimeToString(booking.workshop_time_from),
        helpers.formateTimeToString(booking.workshop_time_to),
        booking.venue,
        booking.coupon_code,
        booking.language,
        helpers.createToken({ email: booking.email }).data,
        booking.booking_src,
        booking.tonariwaId)
        .catch((err) => { throw err; });
    });
    await Promise.all(mailSender);
  }
  process.exit(0);
}());
