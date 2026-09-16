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
      alert("Error memutus sesi");
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
      alert("Error memutus sesi");
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
   fs.writeFileSync('src/pages/Dashboard.tsx', code);
   console.log("Patched admin delete function successfully.");
} else {
   console.log("oldAdminDelete not found again.");
}
