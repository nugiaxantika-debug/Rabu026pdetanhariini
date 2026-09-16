const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

const oldFetch = `  const fetchAdminData = () => {
    if (isAdmin) {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      fetch(\`\${apiBaseURL}/api/users/count\`)
        .then(res => res.json())
        .then(data => setTotalUsers(data.count || 0))
        .catch(err => console.error(err));
      
      fetch(\`\${apiBaseURL}/api/bots/active\`)
        .then(res => res.json())
        .then(data => {
           setTotalBots(data.count || 0);
           setActiveBotsInfo(data.bots || []);
        })
        .catch(err => console.error(err));
        
      fetch(\`\${apiBaseURL}/api/admin/payments\`, {
        headers: { "x-user-email": currentUserEmail || "default" }
      })
        .then(res => res.json())
        .then(data => {
           if (data.success && data.payments) {
               setPayments(data.payments);
           }
        })
        .catch(err => console.error(err));
    }
  };`;

const newFetch = `  const fetchAdminData = () => {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      
      fetch(\`\${apiBaseURL}/api/users/count\`)
        .then(res => res.json())
        .then(data => setTotalUsers(data.count || 0))
        .catch(err => console.error(err));
      
      fetch(\`\${apiBaseURL}/api/bots/active\`)
        .then(res => res.json())
        .then(data => {
           setTotalBots(data.count || 0);
           if (isAdmin) setActiveBotsInfo(data.bots || []);
        })
        .catch(err => console.error(err));

    if (isAdmin) {
      fetch(\`\${apiBaseURL}/api/admin/payments\`, {
        headers: { "x-user-email": currentUserEmail || "default" }
      })
        .then(res => res.json())
        .then(data => {
           if (data.success && data.payments) {
               setPayments(data.payments);
           }
        })
        .catch(err => console.error(err));
    }
  };`;

if (code.includes(oldFetch)) {
  code = code.replace(oldFetch, newFetch);
  fs.writeFileSync('src/pages/Dashboard.tsx', code);
  console.log("Patched successfully.");
} else {
  console.log("Could not find oldFetch");
}
