const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace hentai logic
content = content.replace(
  /const imageUrl = item\.file_url \|\| item\.large_file_url;\n\s+await this\.sock\.sendMessage\(jid, \{ image: \{ url: imageUrl \}, caption: `🔞 \*NSFW \$\{q\.charAt\(0\)\.toUpperCase\(\) \+ q\.slice\(1\)\}\*` \}, \{ quoted: msg \}\);/g,
  `const imageUrl = item.file_url || item.large_file_url;\n                const axios = require('axios');\n                const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });\n                await this.sock.sendMessage(jid, { image: Buffer.from(imgRes.data), caption: \`🔞 *NSFW \${q.charAt(0).toUpperCase() + q.slice(1)}*\` }, { quoted: msg });`
);

fs.writeFileSync(file, content);
console.log("Hentaimenu patched");
