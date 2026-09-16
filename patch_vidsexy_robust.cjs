const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const oldLogicRegex = /try \{\s*const ytSearch = await vredenYt\.search\(searchQuery\);[\s\S]*?catch \(e\) \{\s*console\.error\("Video search error:", e\);\s*await this\.sock\.sendMessage\(jid, \{ text: `❌ \*Video Gagal Dimuat\*\\n\\nMaaf, API provider video sedang bermasalah atau dalam perbaikan\. Silakan coba lagi nanti\.` \}, \{ quoted: msg \}\);\s*\}/;

const newLogic = `      try {
        let videos = [];
        let searchSuccess = false;
        
        try {
           const ytSearch = await vredenYt.search(searchQuery);
           if (ytSearch && ytSearch.status && ytSearch.results && ytSearch.results.length > 0) {
              videos = ytSearch.results.filter(v => v.type === 'video' && v.seconds <= 600);
              if (videos.length === 0) {
                 videos = ytSearch.results.filter(v => v.type === 'video');
              }
              searchSuccess = true;
           }
        } catch (searchErr) {
           console.log("vredenYt search failed, trying fallback...", searchErr.message);
        }
        
        // Fallback search using youtube-ext
        if (!searchSuccess) {
           try {
              const yt = (await import('youtube-ext')).default || (await import('youtube-ext'));
              const fallbackSearch = await yt.search(searchQuery);
              if (fallbackSearch && fallbackSearch.videos && fallbackSearch.videos.length > 0) {
                 // Format to match expected structure
                 videos = fallbackSearch.videos.map(v => ({
                    url: v.url,
                    title: v.title,
                    type: 'video',
                    seconds: v.duration ? (v.duration.seconds || 0) : 0
                 })).filter(v => v.seconds <= 600);
                 
                 if (videos.length === 0) {
                    videos = fallbackSearch.videos.map(v => ({
                        url: v.url,
                        title: v.title,
                        type: 'video'
                    }));
                 }
                 searchSuccess = true;
              }
           } catch (fallbackErr) {
              console.log("Fallback search also failed:", fallbackErr.message);
           }
        }

        if (videos.length > 0) {
           // Try up to 3 different videos
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
                console.error(\`Failed to download video \${i}:\`, dlErr.message);
              }
           }
        }
        
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, tidak dapat menemukan video untuk kueri tersebut.\` }, { quoted: msg });
      } catch (e) {
        console.error("Video search error:", e);
        await this.sock.sendMessage(jid, { text: \`❌ *Video Gagal Dimuat*\\n\\nMaaf, API provider video sedang bermasalah atau dalam perbaikan. Silakan coba lagi nanti.\` }, { quoted: msg });
      }`;

if (oldLogicRegex.test(code)) {
  code = code.replace(oldLogicRegex, newLogic);
  fs.writeFileSync(file, code);
  console.log("Robust patched successfully!");
} else {
  console.log("Could not find the target code to patch. Regex didn't match.");
}
