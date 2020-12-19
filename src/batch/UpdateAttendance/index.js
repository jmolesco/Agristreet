/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repo = require('@Library/repository')();
const sendMailNoShowBooking = require('@Library/mails/sendMailNoShowBooking');
const helpers = require('@Library/helpers');
const constants = require('@Library/constants');

(async function main() {
  const result = await repo.BookingRepository.GetActiveBookingByDate(helpers.getLocalDate());
  if (result.length > 0) {
    const boookingIds = result.map(b => b.id);
    await repo.BookingRepository
      .BatchUpdateUserBooking(boookingIds, constants.AttendanceStatus.NoShow);
    const mailSender = result.map(async (booking) => {
      await sendMailNoShowBooking(booking.email,
        booking.last_name,
        booking.first_name,
        booking.schedule_date,
        helpers.formateTimeToString(booking.time_from),
        helpers.formateTimeToString(booking.time_to),
        helpers.getPropertyName(booking.workshop_id, booking.language),
        helpers.formateTimeToString(booking.workshop_time_from),
        helpers.formateTimeToString(booking.workshop_time_to),
        booking.language,
        booking.booking_src,
        booking.tonariwaId)
        .catch((err) => { throw err; });
    });
    await Promise.all(mailSender);
  }
  process.exit(0);
}());
