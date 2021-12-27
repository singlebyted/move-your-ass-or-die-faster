const fs = require('fs');
const execSync = require('child_process').execSync;

const md5 = require('md5');

/**
 * @param {string} imgPath
 * @param {string} robotKey
 */
function shareToWecom(imgPath, robotKey) {
  const buffer = fs.readFileSync(imgPath);
  const hash = md5(buffer);

  const command = `
    curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${robotKey}' \
    -H 'Content-Type: application/json' \
    -d '
    {
      "msgtype": "image",
      "image": {
        "base64": "${buffer.toString('base64')}",
        "md5": "${hash}"
      }
    }'
  `;
  const result = execSync(command);
  try {
    return JSON.parse(result.toString()).errcode === 0;
  } catch {
    return false;
  }
}

module.exports = { shareToWecom };
