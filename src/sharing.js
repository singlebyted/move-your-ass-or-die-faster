const fs = require('fs');
const path = require('path');

const moment = require('moment');

const { INITIAL_NUMBER_OF_SHARING } = require('./constants.js');

const sharingNumberFilePath = path.resolve('.number-of-sharing');

/**
 * @param {{ number?: { number?: number[] } }} holidays holidays data
 * @param {moment.Moment} today moment object
 */
function isTodayAWorkingDay(holidays, today) {
  const [year, month, date] = today.toArray();
  if (!holidays[year] || !holidays[year][month + 1]) {
    return true;
  }

  const holidaysInMonth = holidays[year][month + 1];
  if (!(holidaysInMonth instanceof Array)) {
    throw new Error('holidays format is invalid');
  }

  return !holidaysInMonth.includes(date);
}

/**
 * read number of shared from a specified file
 */
function readSharedNumber() {
  if (!fs.statSync(sharingNumberFilePath, { throwIfNoEntry: false })?.isFile()) {
    writeSharingNumber(INITIAL_NUMBER_OF_SHARING);
  }

  const num = fs.readFileSync(sharingNumberFilePath, { encoding: 'utf-8' }).replace(/(\d+)/, '$1');

  if (isNaN(num)) {
    throw new Error('read sharing number error');
  }

  return +num;
}

/**
 * write number of sharing into a specified file
 *
 * @param {number} num
 */
function writeSharingNumber(num) {
  fs.writeFileSync(sharingNumberFilePath, `${num}`);
}

module.exports = { isTodayAWorkingDay, writeSharingNumber, readSharedNumber };
