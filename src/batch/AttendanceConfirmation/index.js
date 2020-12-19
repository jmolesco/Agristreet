/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repo = require('@Library/repository')();
const sendMailAttendanceConfirmation = require('@Library/mails/sendMailAttendanceConfirmation');

(async function main() {
  const result = await repo.BookingRepository.GetActiveBookingForAttendance();
  if (result.length > 0) {
    await repo.BookingRepository
      .BatchUpdateUserBookingNotifStatus(result.map(x => x.id), true);
    const mailSender = result.map(async (booking) => {
      await sendMailAttendanceConfirmation(booking.email,
        booking.first_name,
        booking.last_name,
        booking.language,
        booking.booking_src,
        booking.tonariwaId)
        .catch((err) => { throw err; });
    });
    await Promise.all(mailSender);
  }
  process.exit(0);
}());
