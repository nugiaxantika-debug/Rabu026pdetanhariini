const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(/\\n\s*app\.post\("\/api\/auth\/register"/, '\n  app.post("/api/auth/register"');
code = code.replace(/\\n\s*app\.get\("\/api\/config"/, '\n  app.get("/api/config"');
fs.writeFileSync('server.ts', code);
