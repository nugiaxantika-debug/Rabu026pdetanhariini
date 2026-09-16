const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/if \(cmd === "toolsmenu"\) \{\s+/, (match) => {
    return match + `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));\n            `;
});

code = code.replace(/if \(cmd === "devicemenu"\) \{\s+/, (match) => {
    return match + `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));\n            `;
});

fs.writeFileSync(file, code);
console.log("Fixed toolsmenu and devicemenu");
