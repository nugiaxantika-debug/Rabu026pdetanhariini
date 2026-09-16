const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

const oldAdminDelete = `  const handleAdminDeleteSession = async (targetEmail: string) => {
    if (!window.confirm(\`Yakin ingin memutus sesi bot untuk \${targetEmail}?\`)) return;
    setAdminDeleting(targetEmail);
    try {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      const res = await fetch(\`\${apiBaseURL}/api/admin/delete-session\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": currentUserEmail || "default"
        },
        body: JSON.stringify({ targetEmail })
      });
      if (res.ok) {
        setLogs(prev => [...prev, { time: new Date().toISOString(), message: \`Admin deleted session for \${targetEmail}\` }]);
        fetchAdminData();
      } else {
        alert("Gagal memutus sesi");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdminDeleting(null);
    }
  };`;

const newAdminDelete = `  const handleAdminDeleteSession = async (targetEmail: string) => {
    if (!window.confirm(\`Yakin ingin memutus sesi bot untuk \${targetEmail}?\`)) return;
    setAdminDeleting(targetEmail);
    try {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      const res = await fetch(\`\${apiBaseURL}/api/admin/delete-session\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": currentUserEmail || "default"
        },
        body: JSON.stringify({ targetEmail })
      });
      if (res.ok) {
        setLogs(prev => [...prev, { time: new Date().toISOString(), message: \`Admin deleted session for \${targetEmail}\` }]);
        fetchAdminData();
      } else {
        alert("Gagal memutus sesi");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdminDeleting(null);
    }
  };

  const handleAdminBanUser = async (targetEmail: string) => {
    if (!window.confirm(\`Yakin ingin MENGHAPUS dan BAN user \${targetEmail}? Mereka tidak akan bisa login atau daftar lagi.\`)) return;
    setAdminDeleting(targetEmail);
    try {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      const res = await fetch(\`\${apiBaseURL}/api/admin/users/\${targetEmail}/delete\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": currentUserEmail || "default"
        }
      });
      if (res.ok) {
        setLogs(prev => [...prev, { time: new Date().toISOString(), message: \`Admin banned user \${targetEmail}\` }]);
        fetchAdminData();
      } else {
        alert("Gagal menghapus dan ban user");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdminDeleting(null);
    }
  };`;

if (code.includes(oldAdminDelete)) {
   code = code.replace(oldAdminDelete, newAdminDelete);
   console.log("Patched admin delete function.");
} else {
   console.log("oldAdminDelete not found");
}

const oldBotList = `                                  <button 
                                    onClick={() => handleAdminDeleteSession(bot.email)}
                                    disabled={adminDeleting === bot.email}
                                    className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg transition-colors border border-rose-500/30 disabled:opacity-50"
                                  >
                                    {adminDeleting === bot.email ? "Memutus..." : "Putuskan Sesi"}
                                  </button>`;

const newBotList = `                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => handleAdminDeleteSession(bot.email)}
                                      disabled={adminDeleting === bot.email}
                                      className="text-xs bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-lg transition-colors border border-orange-500/30 disabled:opacity-50"
                                    >
                                      {adminDeleting === bot.email ? "Memutus..." : "Putuskan Sesi"}
                                    </button>
                                    <button 
                                      onClick={() => handleAdminBanUser(bot.email)}
                                      disabled={adminDeleting === bot.email}
                                      title="Hapus & Ban User"
                                      className="text-xs flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-1.5 rounded-lg transition-colors border border-rose-500/30 disabled:opacity-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>`;

if (code.includes(oldBotList)) {
   code = code.replace(oldBotList, newBotList);
   fs.writeFileSync('src/pages/Dashboard.tsx', code);
   console.log("Patched bot list buttons.");
} else {
   console.log("oldBotList not found");
}

