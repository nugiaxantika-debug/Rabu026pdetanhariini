const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const targetStr = 'const isGroup = jid.endsWith("@g.us");';
const blockLogic = `
    const isGroup = jid.endsWith("@g.us");

    // Auto block private feature
    if (!isGroup && !msg.key.fromMe && !isOwner && this.autoBlockPrivate) {
      if (body !== ".autoblockprivate" && body !== ".delautoblockprivate" && body !== "autoblockprivate" && body !== "delautoblockprivate") {
        try {
          await this.sock.sendMessage(jid, { text: "⛔ *Sistem Auto Block Private Aktif*\\n\\nMaaf, bot tidak menerima pesan pribadi. Anda telah diblokir secara otomatis." }, { quoted: msg });
          await this.sock.updateBlockStatus(senderJid, "block");
          return; // Stop processing further
        } catch (e) {
          console.error("Failed to block user:", e);
        }
      }
    }
`;

if (code.includes(targetStr) && !code.includes('Auto block private feature')) {
  code = code.replace(targetStr, blockLogic.trim());
  fs.writeFileSync(file, code);
  console.log("Patched block logic");
} else {
  console.log("Block logic already exists or target not found");
}
