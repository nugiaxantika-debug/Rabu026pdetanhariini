const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const sertifikatRegex = /^\.?stk(baik|cantik|ganteng|hitam|miskin|kaya|marah|sabar|sakit|keren|misterius|sntai|sombong|lucu|gila|stress)$/i;

const oldSertifBlock = `    } else if (body === "sertifikatmenu" || body === ".sertifikatmenu" || body === "sertifikat menu" || body === ".sertifikat menu") {
      const sertifikatText = \`🎓 *Sertifikat Menu*\\n\\n│ .stkbaik\\n│ .stkcantik\\n│ .stkganteng\\n│ .stkhitam\\n│ .stkmiskin\\n│ .stkkaya\\n│ .stkmarah\\n│ .stksabar\\n│ .stksakit\\n│ .stkkeren\\n│ .stkmisterius\\n│ .stksntai\\n│ .stksombong\\n│ .stklucu\\n│ .stkgila\\n│ .stkstress\`;
      await this.sock.sendMessage(jid, { text: sertifikatText, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, msg.pushName || "User") });
      this.broadcastState(\`Responded to sertifikatmenu command\`);`;

const newSertifBlock = `    } else if (body === "sertifikatmenu" || body === ".sertifikatmenu" || body === "sertifikat menu" || body === ".sertifikat menu") {
      const sertifikatText = \`🎓 *Sertifikat Menu*\\n\\n│ .stkbaik\\n│ .stkcantik\\n│ .stkganteng\\n│ .stkhitam\\n│ .stkmiskin\\n│ .stkkaya\\n│ .stkmarah\\n│ .stksabar\\n│ .stksakit\\n│ .stkkeren\\n│ .stkmisterius\\n│ .stksntai\\n\\n│ .stksombong\\n│ .stklucu\\n│ .stkgila\\n│ .stkstress\\n\\n*Gunakan dengan nama, contoh: .stkbaik Agus*\`;
      await this.sock.sendMessage(jid, { text: sertifikatText, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, msg.pushName || "User") });
      this.broadcastState(\`Responded to sertifikatmenu command\`);
    } else if (/^\\.?stk(baik|cantik|ganteng|hitam|miskin|kaya|marah|sabar|sakit|keren|misterius|sntai|sombong|lucu|gila|stress)/i.test(body)) {
      const match = body.match(/^\\.?stk(baik|cantik|ganteng|hitam|miskin|kaya|marah|sabar|sakit|keren|misterius|sntai|sombong|lucu|gila|stress)/i);
      const type = match ? match[1].toUpperCase() : 'BAIK';
      const text = messageContent.replace(/^\\.?stk(baik|cantik|ganteng|hitam|miskin|kaya|marah|sabar|sakit|keren|misterius|sntai|sombong|lucu|gila|stress)\\s*/i, "").trim();
      
      if (!text) {
         await this.sock.sendMessage(jid, { text: \`Mohon berikan nama/teks!\\nContoh: .\${match ? match[0].toLowerCase() : '.stkbaik'} Agus\` }, { quoted: msg });
      } else {
         try {
             await this.sock.sendMessage(jid, { text: \`⏳ *Membuat Sertifikat...\` }, { quoted: msg });
             const cleanName = text.substring(0, 20).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
             const svg = \`
               <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                  <rect width="800" height="600" fill="#fcfcfc" />
                  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4af37" stroke-width="15" />
                  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#d4af37" stroke-width="2" />
                  <text x="400" y="120" font-family="Arial" font-size="50" font-weight="bold" fill="#333" text-anchor="middle">SERTIFIKAT</text>
                  <text x="400" y="170" font-family="Arial" font-size="20" fill="#666" text-anchor="middle">DIBERIKAN KEPADA</text>
                  <text x="400" y="270" font-family="Georgia" font-size="60" font-weight="bold" font-style="italic" fill="#000" text-anchor="middle">\${cleanName}</text>
                  <line x1="150" y1="290" x2="650" y2="290" stroke="#000" stroke-width="2" />
                  <text x="400" y="350" font-family="Arial" font-size="24" fill="#333" text-anchor="middle">Sebagai Orang Paling</text>
                  <text x="400" y="420" font-family="Arial" font-size="50" font-weight="bold" fill="#d4af37" text-anchor="middle">\${type}</text>
                  <text x="400" y="520" font-family="Arial" font-size="16" fill="#999" text-anchor="middle">Resmi Dikeluarkan oleh Bot WhatsApp</text>
               </svg>\`;
             const buffer = await sharp(Buffer.from(svg)).webp({ quality: 80 }).toBuffer();
             const { Sticker } = await import('wa-sticker-formatter');
             const sticker = new Sticker(buffer, { pack: 'Sertifikat', author: 'Bot', type: 'full' });
             const stickerBuffer = await sticker.toBuffer();
             await this.sock.sendMessage(jid, { sticker: stickerBuffer }, { quoted: msg });
         } catch (e) {
             console.error("Sertifikat error: ", e);
             await this.sock.sendMessage(jid, { text: \`❌ Gagal membuat sertifikat.\` }, { quoted: msg });
         }
      }`;

if (code.includes(oldSertifBlock)) {
   code = code.replace(oldSertifBlock, newSertifBlock);
   fs.writeFileSync(file, code);
   console.log("Patched sertifikat successfully!");
} else {
   console.log("Block not found!");
}
