const sharp = require('sharp');
const axios = require('axios');

async function createFakeCall(type, name, duration, avatarUrl) {
    const width = 720;
    const height = 1280;

    let avatarBuffer;
    try {
        if (avatarUrl) {
            const res = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
            avatarBuffer = Buffer.from(res.data);
        } else {
            // Default avatar
            avatarBuffer = await sharp({
                create: { width: 400, height: 400, channels: 4, background: { r: 200, g: 200, b: 200, alpha: 1 } }
            }).png().toBuffer();
        }
    } catch (e) {
        avatarBuffer = await sharp({
            create: { width: 400, height: 400, channels: 4, background: { r: 200, g: 200, b: 200, alpha: 1 } }
        }).png().toBuffer();
    }

    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="avatarClip">
                <circle cx="360" cy="500" r="120" />
            </clipPath>
        </defs>
        
        <!-- Background -->
        <rect width="100%" height="100%" fill="#0b141a" />
        
        <!-- Top UI -->
        <text x="360" y="100" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">${name}</text>
        <text x="360" y="140" font-family="Arial, sans-serif" font-size="24" fill="#8696a0" text-anchor="middle">${duration}</text>
        
        <!-- Icons (Mock) -->
        <circle cx="60" cy="110" r="24" fill="#1f2c34" />
        <circle cx="660" cy="110" r="24" fill="#1f2c34" />

        <!-- Bottom UI Background -->
        <rect x="40" y="1080" width="640" height="120" rx="60" fill="#1f2c34" />
        
        <!-- Bottom Buttons -->
        <!-- Dots -->
        <circle cx="120" cy="1140" r="40" fill="#2a3942" />
        <!-- Video -->
        <circle cx="280" cy="1140" r="40" fill="#2a3942" />
        <!-- Speaker (White) -->
        <circle cx="440" cy="1140" r="40" fill="#ffffff" />
        <!-- End Call (Red) -->
        <circle cx="600" cy="1140" r="40" fill="#ea0038" />
    </svg>`;

    // Circle avatar
    const circleAvatar = await sharp(avatarBuffer)
        .resize(240, 240, { fit: 'cover' })
        .composite([{
            input: Buffer.from(`<svg><circle cx="120" cy="120" r="120" /></svg>`),
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    const finalImage = await sharp(Buffer.from(svg))
        .composite([
            { input: circleAvatar, top: 380, left: 240 }
        ])
        .png()
        .toBuffer();

    require('fs').writeFileSync(`test_${type}.png`, finalImage);
    console.log(`Saved test_${type}.png`);
}

createFakeCall('android', 'Syarif', '24.58', 'https://github.com/identicons/syarif.png');
