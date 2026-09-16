const sharp = require('sharp');
const TextToSVG = require('text-to-svg');

async function run() {
    const textToSVG = TextToSVG.loadSync();
    let svgPaths = '';
    svgPaths += textToSVG.getPath('SERTIFIKAT', { fontSize: 50, anchor: 'center baseline', attributes: { fill: '#333' }, x: 400, y: 120 });
    const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
       <rect width="800" height="600" fill="#fcfcfc" />
       ${svgPaths}
    </svg>`;
    const buffer = await sharp(Buffer.from(svg)).webp().toBuffer();
    console.log("Stkbaik works! Length:", buffer.length);
}
run();
