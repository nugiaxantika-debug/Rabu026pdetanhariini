const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const target1 = `await this.sock.sendMessage(jid, { video: { url: dlRes.download.url }, caption: \`✅ *Berhasil menemukan video!*\\n\\n\${targetQuery}\\n\\n\${randomVideo.title || ''}\` }, { quoted: msg });`;
const replacement1 = `await this.sock.sendMessage(jid, { document: { url: dlRes.download.url }, mimetype: 'video/mp4', fileName: \`Video_\${targetQuery}.mp4\`, caption: \`✅ *Berhasil menemukan video!*\n\n\${targetQuery}\n\n\${randomVideo.title || ''}\n\n_Catatan: Video dikirim dalam bentuk dokumen/file agar suara & gambar dapat diputar dengan lancar di semua perangkat._\` }, { quoted: msg });`;

if (code.includes(target1)) {
  code = code.replace(target1, replacement1);
  fs.writeFileSync(file, code);
  console.log("Patched successfully with document format!");
} else {
  console.log("Could not find the target code to patch.");
}
