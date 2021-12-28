const fs = require('fs');
const https = require('https');

const md5 = require('md5');

/**
 * @param {string} imgPath
 * @param {string} robotKey
 */
function shareToWecom(imgPath, robotKey) {
  const buffer = fs.readFileSync(imgPath);
  const hash = md5(buffer);

  return new Promise((resolve, reject) => {
    const req = https
      .request(
        `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${robotKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
        (res) => {
          res.on('data', (data) => {
            resolve(JSON.parse(data.toString()).errcode === 0);
          });
        },
      )
      .on('error', (e) => {
        reject(e);
      });

    req.write(
      JSON.stringify({
        msgtype: 'image',
        image: {
          base64: buffer.toString('base64'),
          md5: hash,
        },
      }),
    );
    req.end();
  });
}

module.exports = { shareToWecom };
