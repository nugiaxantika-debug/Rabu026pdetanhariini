const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const anchor = '} else if (body.startsWith(".cekproduk") || body.startsWith("cekproduk")) {';

if (!code.includes(anchor)) {
    console.error("Anchor not found!");
    process.exit(1);
}

const fakecallLogic = `
    } else if (body.startsWith(".fakecallandroid") || body.startsWith(".fakecalliphone") || body.startsWith(".fakevidcalliphone") || body.startsWith("fakecallandroid") || body.startsWith("fakecalliphone") || body.startsWith("fakevidcalliphone")) {
        const isIphone = body.includes("iphone");
        const isVideo = body.includes("vidcall");
        const args = body.split(" ").slice(1).join(" ").split("|");
        const name = (args[0] || "Unknown").trim();
        const duration = (args[1] || "00:00").trim();
        
        let imageBuffer = null;
        try {
            const isQuotedImage = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
            if (isQuotedImage) {
                const stream = await downloadContentFromMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, 'image');
                let buffer = Buffer.from([]);
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                imageBuffer = buffer;
            } else if (msg.message?.imageMessage) {
                const stream = await downloadContentFromMessage(msg.message.imageMessage, 'image');
                let buffer = Buffer.from([]);
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                imageBuffer = buffer;
            }
        } catch (e) {
            console.error("Error downloading image:", e);
        }

        if (!imageBuffer) {
            imageBuffer = await sharp({
                create: { width: 400, height: 400, channels: 4, background: { r: 150, g: 150, b: 150, alpha: 1 } }
            }).png().toBuffer();
        }

        try {
            await this.sock.sendMessage(jid, { text: "⏳ Sedang membuat..." }, { quoted: msg });
            
            const width = 720;
            const height = 1280;
            let compositeOptions = [];
            
            const iconOptions = \`<circle cx="120" cy="1140" r="45" fill="#2a3942" />
                <!-- dots -->
                <circle cx="105" cy="1140" r="5" fill="#fff" />
                <circle cx="120" cy="1140" r="5" fill="#fff" />
                <circle cx="135" cy="1140" r="5" fill="#fff" />\`;
                
            const iconVideo = \`<circle cx="280" cy="1140" r="45" fill="#2a3942" />
                <!-- video -->
                <path d="M 265 1130 L 285 1130 A 5 5 0 0 1 290 1135 L 290 1145 A 5 5 0 0 1 285 1150 L 265 1150 A 5 5 0 0 1 260 1145 L 260 1135 A 5 5 0 0 1 265 1130 Z M 290 1135 L 300 1130 L 300 1150 L 290 1145" fill="#fff" />\`;
                
            const iconSpeaker = \`<circle cx="440" cy="1140" r="45" fill="#ffffff" />
                <!-- speaker -->
                <path d="M 430 1130 L 440 1120 L 440 1160 L 430 1150 L 420 1150 L 420 1130 Z" fill="#000" />
                <path d="M 445 1125 A 20 20 0 0 1 445 1155" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />
                <path d="M 450 1120 A 25 25 0 0 1 450 1160" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" />\`;
                
            const iconEndCall = \`<circle cx="600" cy="1140" r="45" fill="#ea0038" />
                <!-- end call -->
                <path d="M 580 1145 A 25 25 0 0 1 620 1145" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" />
                <path d="M 578 1145 L 575 1155 L 585 1155 Z" fill="#fff" />
                <path d="M 622 1145 L 625 1155 L 615 1155 Z" fill="#fff" />\`;

            if (isVideo) {
                const bg = await sharp(imageBuffer)
                    .resize(width, height, { fit: 'cover' })
                    .modulate({ brightness: 0.5 })
                    .blur(10)
                    .png().toBuffer();
                
                const pip = await sharp(imageBuffer)
                    .resize(180, 260, { fit: 'cover' })
                    .png().toBuffer();
                
                const svg = \`
                <svg width="\${width}" height="\${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="200" fill="url(#gradTop)" />
                    <defs>
                        <linearGradient id="gradTop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#000" stop-opacity="0.8"/>
                            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                        </linearGradient>
                        <linearGradient id="gradBot" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#000" stop-opacity="0"/>
                            <stop offset="100%" stop-color="#000" stop-opacity="0.9"/>
                        </linearGradient>
                        <clipPath id="pipClip">
                            <rect x="500" y="850" width="180" height="260" rx="20" />
                        </clipPath>
                    </defs>
                    <rect y="1000" width="100%" height="280" fill="url(#gradBot)" />
                    
                    <text x="360" y="80" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle">\${name}</text>
                    <text x="360" y="130" font-family="Arial, sans-serif" font-size="28" fill="#dddddd" text-anchor="middle">\${duration}</text>
                    
                    <text x="360" y="650" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">You</text>
                    
                    \${iconOptions}
                    \${iconVideo}
                    \${iconSpeaker}
                    \${iconEndCall}
                </svg>\`;
                
                compositeOptions.push({ input: bg, top: 0, left: 0 });
                // We add pip first
                // Need to mask the pip image with rounded corners
                const roundedPip = await sharp(pip).composite([{
                    input: Buffer.from(\`<svg width="180" height="260"><rect width="180" height="260" rx="20" /></svg>\`),
                    blend: 'dest-in'
                }]).png().toBuffer();

                compositeOptions.push({ input: roundedPip, top: 850, left: 500 });
                compositeOptions.push({ input: Buffer.from(svg), top: 0, left: 0 });
                
                const finalImg = await sharp({
                    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
                })
                .composite(compositeOptions)
                .png().toBuffer();
                
                await this.sock.sendMessage(jid, { image: finalImg, caption: \`Fake VidCall \${name}\` }, { quoted: msg });
                
            } else {
                const isAndro = !isIphone;
                
                const circleAvatar = await sharp(imageBuffer)
                    .resize(320, 320, { fit: 'cover' })
                    .composite([{
                        input: Buffer.from(\`<svg><circle cx="160" cy="160" r="160" /></svg>\`),
                        blend: 'dest-in'
                    }])
                    .png().toBuffer();
                    
                const bottomBg = isAndro ? \`<rect x="40" y="1080" width="640" height="120" rx="60" fill="#1f2c34" />\` : \`\`;
                
                const svg = \`
                <svg width="\${width}" height="\${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#0b141a" />
                    
                    <text x="360" y="110" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle">\${name}</text>
                    <text x="360" y="160" font-family="Arial, sans-serif" font-size="28" fill="#8696a0" text-anchor="middle">\${duration}</text>
                    
                    \${bottomBg}
                    
                    \${iconOptions}
                    \${iconVideo}
                    \${iconSpeaker}
                    \${iconEndCall}
                </svg>\`;
                
                // If iphone, the text might be slightly different but this is very close
                
                compositeOptions.push({ input: Buffer.from(svg), top: 0, left: 0 });
                compositeOptions.push({ input: circleAvatar, top: 380, left: 200 });
                
                const finalImg = await sharp({
                    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } }
                })
                .composite(compositeOptions)
                .png().toBuffer();
                
                await this.sock.sendMessage(jid, { image: finalImg, caption: \`Fake Call \${name}\` }, { quoted: msg });
            }
        } catch (e) {
            console.error("Error drawing fake call:", e);
            await this.sock.sendMessage(jid, { text: "⚠️ Gagal membuat gambar fake call." }, { quoted: msg });
        }
`;

if (!code.includes('body.startsWith(".fakecallandroid")')) {
    code = code.replace(anchor, `${fakecallLogic}${anchor}`);
    fs.writeFileSync('src/services/whatsapp.ts', code);
    console.log('Patched whatsapp.ts for fakecall logic');
} else {
    console.log('Already patched!');
}
