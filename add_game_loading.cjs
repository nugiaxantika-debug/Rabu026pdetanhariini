const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const gamesStrict = [
  'math', 'susunkata', 'tebakgambar', 'tebakkata', 'tebakbendera', 'asahotak',
  'tebakbuah', 'tebaklirik', 'tekateki', 'kuis', 'tebakkota', 'family100',
  'tebakusia', 'tebakkimia', 'tebakangka', 'werewolf', 'tebakuang', 'tebaksurah',
  'tebakhewan', 'tebakbaju', 'tebakcelana', 'tebakmakanan', 'tebakjkt48',
  'truthordare', 'stoptogel'
];

let modified = false;

for (const game of gamesStrict) {
  // Pattern: } else if (body === ".game" || body === "game") {
  const regex = new RegExp(`(} else if \\(body === "\\.${game}" \\|\\| body === "${game}"\\) \\{\\s+)`, 'g');
  
  code = code.replace(regex, (match, p1) => {
    if (code.substring(code.indexOf(match), code.indexOf(match) + 300).includes('sendLoadingAnimation')) {
       return match;
    }
    modified = true;
    return p1 + `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));\n      `;
  });
}

const gamesStartsWith = [
  'togel', 'ulartangga'
];

for (const game of gamesStartsWith) {
  // Pattern can be body.startsWith(".togel ") or body.startsWith(".ulartangga") 
  const regex1 = new RegExp(`(} else if \\(body\\.startsWith\\("\\.${game} "\\) \\|\\| body\\.startsWith\\("${game} "\\)\\) \\{\\s+)`, 'g');
  code = code.replace(regex1, (match, p1) => {
    if (code.substring(code.indexOf(match), code.indexOf(match) + 300).includes('sendLoadingAnimation')) {
       return match;
    }
    modified = true;
    return p1 + `await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));\n      `;
  });

  const regex2 = new RegExp(`(} else if \\(body\\.startsWith\\("\\.${game}"\\) \\|\\| body\\.startsWith\\("${game}"\\)\\) \\{\\s+)`, 'g');
  code = code.replace(regex2, (match, p1) => {
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
