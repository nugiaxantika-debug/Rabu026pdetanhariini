const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

if (!code.includes('deleteDoc')) {
   code = code.replace(/import \{([^}]+)\} from "firebase\/firestore";/, 'import {$1, deleteDoc} from "firebase/firestore";');
} else if (!code.match(/import \{.*deleteDoc.*\} from "firebase\/firestore"/)) {
   code = code.replace(/import \{([^}]+)\} from "firebase\/firestore";/, 'import {$1, deleteDoc} from "firebase/firestore";');
}

code = code.replace(/await bot.logout\(\);/g, 'await bot.stop();');

fs.writeFileSync('server.ts', code);
console.log("Patched server.ts");
