const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const targetLogic = `
                  await this.sock.sendMessage(jid, { document: { url: dlRes.download.url }, mimetype: 'video/mp4', fileName: \`Video_\${targetQuery}.mp4\`, caption: \`✅ *Berhasil menemukan video!*\n\n\${targetQuery}\n\n\${randomVideo.title || ''}\n\n_Catatan: Video dikirim dalam bentuk dokumen/file agar suara & gambar dapat diputar dengan lancar di semua perangkat._\` }, { quoted: msg });
                  this.broadcastState(\`Responded to \${targetQuery} command\`);
                  return; // Success
`;

const newLogic = `
                  const dlUrl = dlRes.download.url;
                  this.broadcastState(\`Found video for \${targetQuery}, preparing to transcode...\`);
                  
                  try {
                      const { data } = await axios.get(dlUrl, { responseType: 'arraybuffer' });
                      const buffer = Buffer.from(data);
                      const tmpId = Date.now() + Math.random().toString(36).substring(2, 7);
                      const tmpRaw = \`/tmp/vid_\${tmpId}.raw\`;
                      const tmpFixed = \`/tmp/vid_\${tmpId}_fixed.mp4\`;
                      
                      const fs = require('fs');
                      fs.writeFileSync(tmpRaw, buffer);
                      
                      const util = require('util');
                      const exec = util.promisify(require('child_process').exec);
                      const ffmpegStatic = require('ffmpeg-static');
                      
                      await exec(\`"\${ffmpegStatic}" -y -i \${tmpRaw} -c:v libx264 -preset veryfast -crf 28 -c:a aac -b:a 128k -t 30 \${tmpFixed}\`);
                      
                      const fixedBuffer = fs.readFileSync(tmpFixed);
                      await this.sock.sendMessage(jid, { video: fixedBuffer, mimetype: "video/mp4", caption: \`✅ *Berhasil menemukan video!*\n\n\${targetQuery}\n\n\${randomVideo.title || ''}\` }, { quoted: msg });
                      
                      if (fs.existsSync(tmpRaw)) fs.unlinkSync(tmpRaw);
                      if (fs.existsSync(tmpFixed)) fs.unlinkSync(tmpFixed);
                      
                      this.broadcastState(\`Responded to \${targetQuery} command\`);
                      return; // Success
                  } catch (convErr) {
                      console.error("Transcode error:", convErr);
                      // Fallback to sending as document if it fails
                      await this.sock.sendMessage(jid, { document: { url: dlUrl }, mimetype: 'video/mp4', fileName: \`Video_\${targetQuery}.mp4\`, caption: \`✅ *Berhasil menemukan video!*\n\n\${targetQuery}\n\n\${randomVideo.title || ''}\n\n_Catatan: Dikirim sbg dokumen karena terjadi error konversi._\` }, { quoted: msg });
                      return;
                  }
`;

if (code.includes(targetLogic.trim())) {
  code = code.replace(targetLogic.trim(), newLogic.trim());
  fs.writeFileSync(file, code);
  console.log("Patched successfully with async FFmpeg transcode!");
} else {
  console.log("Could not find the target code to patch.");
}
