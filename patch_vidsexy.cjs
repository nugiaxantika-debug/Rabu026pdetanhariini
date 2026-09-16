const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const oldLogic = `      try {
        const ytSearch = await vredenYt.search(searchQuery);
        if (ytSearch && ytSearch.status && ytSearch.results && ytSearch.results.length > 0) {
          // Fallback to longer videos if short ones aren't found
          let videos = ytSearch.results.filter(v => v.type === 'video' && v.seconds <= 600);
          if (videos.length === 0) {
             videos = ytSearch.results.filter(v => v.type === 'video');
          }
          
          if (videos.length > 0) {
            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            const dlRes = await vredenYt.ytmp4(randomVideo.url);
            
            if (dlRes && dlRes.status && dlRes.download && dlRes.download.url) {
              await this.sock.sendMessage(jid, { video: { url: dlRes.download.url }, caption: \`✅ *Berhasil menemukan video!*\\n\\n\${targetQuery}\\n\\n\${randomVideo.title || ''}\` }, { quoted: msg });
              this.broadcastState(\`Responded to \${targetQuery} command\`);
              return;
            }
          }
        }
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, tidak dapat menemukan video untuk kueri tersebut.\` }, { quoted: msg });
      } catch (e) {
        console.error("Video search error:", e);
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, API provider video sedang bermasalah atau dalam perbaikan. Silakan coba lagi nanti.\` }, { quoted: msg });
      }`;

const newLogic = `      try {
        const ytSearch = await vredenYt.search(searchQuery);
        if (ytSearch && ytSearch.status && ytSearch.results && ytSearch.results.length > 0) {
          // Fallback to longer videos if short ones aren't found
          let videos = ytSearch.results.filter(v => v.type === 'video' && v.seconds <= 600);
          if (videos.length === 0) {
             videos = ytSearch.results.filter(v => v.type === 'video');
          }
          
          if (videos.length > 0) {
             // Try up to 3 different videos
             // Shuffle the videos array
             const shuffledVideos = videos.sort(() => 0.5 - Math.random());
             let maxAttempts = Math.min(3, shuffledVideos.length);
             
             for (let i = 0; i < maxAttempts; i++) {
                const randomVideo = shuffledVideos[i];
                try {
                  const dlRes = await vredenYt.ytmp4(randomVideo.url);
                  
                  if (dlRes && dlRes.status && dlRes.download && dlRes.download.url) {
                    await this.sock.sendMessage(jid, { video: { url: dlRes.download.url }, caption: \`✅ *Berhasil menemukan video!*\\n\\n\${targetQuery}\\n\\n\${randomVideo.title || ''}\` }, { quoted: msg });
                    this.broadcastState(\`Responded to \${targetQuery} command\`);
                    return; // Success
                  }
                } catch (dlErr) {
                  console.error(\`Failed to download video \${i}:\`, dlErr);
                }
             }
          }
        }
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, tidak dapat menemukan video untuk kueri tersebut.\` }, { quoted: msg });
      } catch (e) {
        console.error("Video search error:", e);
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, API provider video sedang bermasalah atau dalam perbaikan. Silakan coba lagi nanti.\` }, { quoted: msg });
      }`;

if (code.includes(oldLogic)) {
  code = code.replace(oldLogic, newLogic);
  fs.writeFileSync(file, code);
  console.log("Patched successfully!");
} else {
  console.log("Could not find the target code to patch.");
}
