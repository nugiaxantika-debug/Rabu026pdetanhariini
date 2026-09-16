const { generateIQC } = require('iqc-canvas');
const fs = require('fs');

async function test() {
    const result = await generateIQC('Halo semuanya', '12:00', { bubbleColor: '#ff3b30', textColor: '#ffffff' });
    fs.writeFileSync('test_merah.png', result.image);
}

test();
