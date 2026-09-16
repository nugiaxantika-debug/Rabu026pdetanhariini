const sharp = require('sharp');
async function test() {
    const img = sharp('test_merah.png');
    const metadata = await img.metadata();
    const { data } = await img.raw().toBuffer({ resolveWithObject: true });
    // check pixel inside bubble: bubbleX=22, bubbleWidth > 100
    // bubbleY is around 549
    const y = 580;
    const x = 50;
    const offset = (y * metadata.width + x) * metadata.channels;
    const r = data[offset];
    const g = data[offset+1];
    const b = data[offset+2];
    console.log(`Pixel at 50, 580: rgba(${r}, ${g}, ${b})`);
}
test();
