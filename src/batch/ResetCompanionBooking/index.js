/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
require('babel-polyfill');
const repo = require('@Library/repository')();

(async function main() {
  await repo.BookingBuddiesRepository.UpdateBookingBuddiesForReset();
  process.exit(0);
}());
