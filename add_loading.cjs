const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const menus = [
  'downloadmenu', 'groupmenu', 'gamemenu', 'ownermenu', 'funmenu', 'margamenu',
  'videomenu', 'stickermenu', 'cecanmenu', 'primbonmenu', 'animemenu', 'kristenmenu',
  'islammenu', 'sertifikatmenu', 'rpgmenu', 'storemenu', 'beritamenu', 'sulapmenu',
  'hentaimenu', 'hantumenu', 'bokepmenu', 'aimenu', 'postermenu', 'coganmenu',
  'toolsmenu', 'devicemenu', 'tiketmenu', 'karyawanmenu', 'hewanmenu', 'cdramamenu',
  'fakecallmenu', 'iqcmenu'
];

let modified = false;

for (const menu of menus) {
  // We want to match:
  // } else if (body === "menu" || body === ".menu" ...) {
  // and insert `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));`
  
  const regex = new RegExp(`(} else if \\(body === "${menu}"[^\\)]+\\) \\{\\s+)`, 'g');
  
  code = code.replace(regex, (match, p1) => {
    // Only insert if not already there
    if (code.substring(code.indexOf(match), code.indexOf(match) + 300).includes('sendLoadingAnimation')) {
       return match;
    }
    modified = true;
    return p1 + `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));\n      `;
  });
}

if (modified) {
  fs.writeFileSync(file, code);
  console.log("Modified successfully");
} else {
  console.log("No modifications made");
}
