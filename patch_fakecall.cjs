const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// 1. Add fakecallCommands to the list of commands
const fakecallCmds = `const fakecallCommands = ['.fakecallmenu', 'fakecallmenu', '.fakecallandroid', 'fakecallandroid', '.fakecalliphone', 'fakecalliphone', '.fakevidcalliphone', 'fakevidcalliphone'];`;
if (!code.includes('const fakecallCommands =')) {
    code = code.replace(/const cdramaCommands = \[.*?\];/, `$&
    ${fakecallCmds}`);
}

// 2. Add fakecallCommands to requireRegistrationCommands
if (!code.includes('...fakecallCommands')) {
    code = code.replace(/(\.\.\.cdramaCommands,)/, `$1
        ...fakecallCommands,`);
}

// 3. Add to allmenu text
if (!code.includes('│ .fakecallmenu')) {
    code = code.replace(/│ \.cdramamenu/, `$&
│ .fakecallmenu`);
}

// 4. Add the fakecallmenu handler
const fakecallHandler = `
    } else if (body === "fakecallmenu" || body === ".fakecallmenu" || body === "fakecall menu" || body === ".fakecall menu") {
      const fakecallText = \`📱 *Fake Call Menu*\\n\\n│ .fakecallandroid teks | durasi\\n│ .fakecalliphone teks | durasi\\n│ .fakevidcalliphone teks | durasi\\n\\nContoh:\\n.fakecallandroid Sayang | 05:20\\n\\nCatatan: Reply gambar untuk dijadikan foto profil.\`;
      await this.sock.sendMessage(jid, { text: fakecallText, contextInfo: this.getMenuContextInfo() }, { quoted: this.getFakeMenuQuote(senderJid, msg.pushName || "User") });
`;
if (!code.includes('body === "fakecallmenu"')) {
    code = code.replace(/} else if \(body === "storemenu"/, `${fakecallHandler}$&`);
}

fs.writeFileSync('src/services/whatsapp.ts', code);
console.log('Patched whatsapp.ts for fakecall menu structure');
