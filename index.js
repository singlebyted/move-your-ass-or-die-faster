const moment = require('moment');
const { holidays } = require('./data');
const { drawPic } = require('./src/drawer');
const { shareToWecom } = require('./src/share');
const { readSharedNumber, isTodayAWorkingDay, writeSharingNumber } = require('./src/sharing');

require('dotenv').config();

async function main() {
  const today = moment();
  if (!isTodayAWorkingDay(holidays, today)) {
    return;
  }

  const sharingNumber = readSharedNumber() + 1;
  const imgPath = await drawPic(sharingNumber);

  // TODO: make this configurable
  const success = shareToWecom(imgPath, process.env.WECOM_BOT_KEY);
  if (success) {
    writeSharingNumber(sharingNumber);
  }
}

main();
