const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('private autoBlockPrivate: boolean = false;')) {
  code = code.replace(
    'private activeSwGroups = new Set<string>();',
    'private activeSwGroups = new Set<string>();\n  private autoBlockPrivate: boolean = false;'
  );
}

const ownerCmdsLineRegex = /const ownerCommands = \['[^']+('.*?)\];/;
const ownerCmdsMatch = code.match(ownerCmdsLineRegex);
if (ownerCmdsMatch && !ownerCmdsMatch[0].includes('autoblockprivate')) {
  code = code.replace(
    ownerCmdsMatch[0],
    ownerCmdsMatch[0].replace(']', ", '.autoblockprivate', 'autoblockprivate', '.delautoblockprivate', 'delautoblockprivate']")
  );
}

const targetOwnerText = /const ownerText = \`👑 \*Owner Menu\*(.*?)\`;/s;
if (code.match(targetOwnerText) && !code.includes('.autoblockprivate')) {
  code = code.replace(
    '│ .broadcast',
    '│ .autoblockprivate\n│ .delautoblockprivate\n│ .broadcast'
  );
}

const blockLogic = `
    const isOwner = senderJid ? this.ownerNumbers.has(senderJid.replace(/[^0-9]/g, "") + "@s.whatsapp.net") : false;

    // Auto block private feature
    if (!isGroup && !msg.key.fromMe && !isOwner && this.autoBlockPrivate) {
      if (body !== ".autoblockprivate" && body !== ".delautoblockprivate") {
        try {
          await this.sock.sendMessage(jid, { text: "⛔ *Sistem Auto Block Private Aktif*\n\nMaaf, bot tidak menerima pesan pribadi. Anda telah diblokir secara otomatis." }, { quoted: msg });
          await this.sock.updateBlockStatus(senderJid, "block");
          return; // Stop processing further
        } catch (e) {
          console.error("Failed to block user:", e);
        }
      }
    }
`;

if (code.includes('const isGroup = jid.endsWith("@g.us");')) {
   const isOwnerRegex = /const isOwner = senderJid \? this\.ownerNumbers\.has\(senderJid\.replace\(\/\[\^0-9\]\/g, ""\) \+ "@s\.whatsapp\.net"\) : false;/;
   
   if (!code.includes('// Auto block private feature')) {
      code = code.replace(isOwnerRegex, blockLogic);
   }
}

// Now adding the command logic
const cmdLogic = `
    } else if (body === "autoblockprivate" || body === ".autoblockprivate") {
      if (!isOwner) return await this.sock.sendMessage(jid, { text: \`👑 *Akses Ditolak*\nPerintah ini hanya bisa digunakan oleh Owner!\` }, { quoted: msg });
      this.autoBlockPrivate = true;
      await this.sock.sendMessage(jid, { text: \`✅ *Berhasil mengaktifkan Auto Block Private*\n\nSetiap pesan pribadi yang masuk akan otomatis diblokir.\` }, { quoted: msg });
    } else if (body === "delautoblockprivate" || body === ".delautoblockprivate") {
      if (!isOwner) return await this.sock.sendMessage(jid, { text: \`👑 *Akses Ditolak*\nPerintah ini hanya bisa digunakan oleh Owner!\` }, { quoted: msg });
      this.autoBlockPrivate = false;
      await this.sock.sendMessage(jid, { text: \`✅ *Berhasil menonaktifkan Auto Block Private*\n\nPesan pribadi kembali diizinkan.\` }, { quoted: msg });
`;

if (!code.includes('body === "autoblockprivate"')) {
   code = code.replace(
      '} else if (body.startsWith(".warn") || body.startsWith("warn")) {',
      cmdLogic + '} else if (body.startsWith(".warn") || body.startsWith("warn")) {'
   );
}

fs.writeFileSync(file, code);
console.log("Patched autoblockprivate");
