const fs = require('fs');
const path = require('path');

const { createCanvas, loadImage } = require('canvas');

/**
 * @param {number} num
 */
async function drawPic(num) {
  return loadImage('assets/origin.png').then((image) => {
    const canvas = createCanvas(684, 670);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, image.width, image.height);

    // draw through line on original number
    const throughLineHeight = 2;
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#F00';
      ctx.fillRect(64, 605 + 6 * (i + throughLineHeight), 50, throughLineHeight);
    }

    // draw a new number
    ctx.font = '30px Impact';
    ctx.fillText(num, 66, 602);

    const targetPath = path.resolve('temp/target.png');
    const targetDir = path.dirname(targetPath);
    if (!fs.statSync(targetDir, { throwIfNoEntry: false })?.isDirectory()) {
      fs.mkdirSync(targetDir);
    }
    const out = fs.createWriteStream(targetPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    return new Promise((resolve, _) => {
      out.on('finish', () => resolve(targetPath));
    });
  });
}

module.exports = { drawPic };
