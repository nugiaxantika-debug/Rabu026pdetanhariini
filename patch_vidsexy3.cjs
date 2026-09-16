const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/v\.seconds <= 600/g, 'v.seconds <= 60');

fs.writeFileSync(file, code);
console.log("Patched to <= 60 seconds");
