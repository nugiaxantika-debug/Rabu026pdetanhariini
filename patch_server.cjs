const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

const isBannedFunc = `  async function isBanned(email: string) {
      try {
         const d = await getDoc(doc(adminDb, "banned", email));
         if (d.exists()) return true;
      } catch(e) {}
      if (fs.existsSync("banned_emails.json")) {
         try {
             const banned = JSON.parse(fs.readFileSync("banned_emails.json", "utf-8"));
             if (banned.includes(email)) return true;
         } catch(e){}
      }
      return false;
  }
`;

const registerStart = `  app.post("/api/auth/register", async (req, res) => {
    const { email, password } = req.body;`;

const newRegisterStart = `  app.post("/api/auth/register", async (req, res) => {
    const { email, password } = req.body;
    if (await isBanned(email)) {
       return res.status(403).json({ error: "Email ini telah dibanned oleh admin." });
    }`;

const loginStart = `  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;`;

const newLoginStart = `  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (await isBanned(email)) {
       return res.status(403).json({ error: "Email ini telah dibanned oleh admin." });
    }`;

const deleteEndpoint = `
  app.post("/api/admin/users/:email/delete", async (req, res) => {
    const adminEmail = req.headers["x-user-email"];
    if (adminEmail !== "nugiaxantika@gmail.com" && adminEmail !== "jujqkqpenolimako@gmail.com") {
       return res.status(403).json({ error: "Forbidden" });
    }
    const targetEmail = req.params.email;
    if (targetEmail === "nugiaxantika@gmail.com" || targetEmail === "jujqkqpenolimako@gmail.com") {
       return res.status(400).json({ error: "Cannot delete admin" });
    }

    try {
       // Add to banned_emails.json
       let banned: string[] = [];
       if (fs.existsSync("banned_emails.json")) {
          try { banned = JSON.parse(fs.readFileSync("banned_emails.json", "utf-8")); } catch(e){}
       }
       if (!banned.includes(targetEmail)) {
          banned.push(targetEmail);
          fs.writeFileSync("banned_emails.json", JSON.stringify(banned));
       }

       // Add to Firestore
       try {
           await setDoc(doc(adminDb, "banned", targetEmail), { email: targetEmail, bannedAt: Date.now() });
           await deleteDoc(doc(adminDb, "users", targetEmail));
       } catch(e) {}

       // Remove from auth.json
       if (fs.existsSync("auth.json")) {
           let users: any[] = [];
           try { users = JSON.parse(fs.readFileSync("auth.json", "utf-8")); } catch(e){}
           users = users.filter((u: any) => u.email !== targetEmail);
           fs.writeFileSync("auth.json", JSON.stringify(users, null, 2));
       }

       // Stop bot and remove from active_bots.json
       if (userBots.has(targetEmail)) {
           const bot = userBots.get(targetEmail)!;
           await bot.logout();
           userBots.delete(targetEmail);
       }
       let activeBots: string[] = [];
       if (fs.existsSync("active_bots.json")) {
          try { activeBots = JSON.parse(fs.readFileSync("active_bots.json", "utf-8")); } catch(e){}
       }
       activeBots = activeBots.filter(e => e !== targetEmail);
       fs.writeFileSync("active_bots.json", JSON.stringify(activeBots));

       res.json({ success: true });
    } catch(err) {
       console.error(err);
       res.status(500).json({ error: "Internal Server Error" });
    }
  });
`;

if (!code.includes("isBanned")) {
   code = code.replace(registerStart, isBannedFunc + "\\n" + newRegisterStart);
   code = code.replace(loginStart, newLoginStart);
   
   // insert delete endpoint before config
   code = code.replace('  app.get("/api/config", async (req, res) => {', deleteEndpoint + '\\n  app.get("/api/config", async (req, res) => {');
   
   fs.writeFileSync('server.ts', code);
   console.log("Patched server.ts successfully");
} else {
   console.log("Already patched");
}
