const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

// The error is: Property 'seconds' does not exist on type '{ text: string; pretty: string; }'
// It's likely related to duration parsing. Let's see if we can find it.
code = code.replace(/durationObj\.seconds/g, 'durationObj.text');
fs.writeFileSync('src/services/whatsapp.ts', code);
console.log("Patched whatsapp.ts seconds");
