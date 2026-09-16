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

for(const game of gamesStrict) {
  const match = code.match(new RegExp(`(} else if \\(body === "\\.${game}" \\|\\| body === "${game}"\\) \\{\\s+await this\\.sendLoadingAnimation)`));
  if (!match) console.log("Missing:", game);
}

const gamesStartsWith = [
  'togel', 'ulartangga'
];

for(const game of gamesStartsWith) {
  const match1 = code.match(new RegExp(`(} else if \\(body\\.startsWith\\("\\.${game} "\\) \\|\\| body\\.startsWith\\("${game} "\\)\\) \\{\\s+await this\\.sendLoadingAnimation)`));
  const match2 = code.match(new RegExp(`(} else if \\(body\\.startsWith\\("\\.${game}"\\) \\|\\| body\\.startsWith\\("${game}"\\)\\) \\{\\s+await this\\.sendLoadingAnimation)`));
  
  if (!match1 && !match2) console.log("Missing:", game);
}
