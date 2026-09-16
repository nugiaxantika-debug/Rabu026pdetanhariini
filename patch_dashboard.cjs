const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. Patch fetchAdminData
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
            setUserPayments(data.payments);
          }
        })
        .catch(err => console.error(err));
    }
  };`;

const newFetch = `  const fetchAdminData = () => {
      const apiBaseURL = import.meta.env.VITE_APP_URL || window.location.origin;
      
      // Fetch for all users (Global Stats)
      fetch(\`\${apiBaseURL}/api/users/count\`)
        .then(res => res.json())
        .then(data => setTotalUsers(data.count || 0))
        .catch(err => console.error(err));
      
      fetch(\`\${apiBaseURL}/api/bots/active\`)
        .then(res => res.json())
        .then(data => {
           setTotalBots(data.count || 0);
           if (isAdmin) {
              setActiveBotsInfo(data.bots || []);
           }
        })
        .catch(err => console.error(err));

    if (isAdmin) {
      fetch(\`\${apiBaseURL}/api/admin/payments\`, {
        headers: { "x-user-email": currentUserEmail || "default" }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.payments) {
            setUserPayments(data.payments);
          }
        })
        .catch(err => console.error(err));
    }
  };`;

if (code.includes(oldFetch)) {
  code = code.replace(oldFetch, newFetch);
} else {
  console.log("Could not find oldFetch");
}

// 2. We need to add an interval to refresh this data for everyone
// The old useEffect:
const oldUseEffect = `  useEffect(() => {
    fetchAdminData();
  }, [isAdmin]);`;

const newUseEffect = `  useEffect(() => {
    fetchAdminData();
    const interval = setInterval(() => {
       fetchAdminData();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAdmin, currentUserEmail]);`;

if (code.includes(oldUseEffect)) {
  code = code.replace(oldUseEffect, newUseEffect);
} else {
  console.log("Could not find oldUseEffect");
}

// 3. Remove the admin-only stats grid
const adminGrid = `                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Users className="w-6 h-6" /></div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{totalUsers}</h3>
                            <p className="text-xs text-neutral-400 mt-1">Total Pengguna Terdaftar</p>
                          </div>
                        </div>
                        <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-center gap-4">
                          <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400"><Smartphone className="w-6 h-6" /></div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{totalBots}</h3>
                            <p className="text-xs text-neutral-400 mt-1">Nomor Aktif Terhubung</p>
                          </div>
                        </div>
                      </div>`;

if (code.includes(adminGrid)) {
  code = code.replace(adminGrid, "");
} else {
  console.log("Could not find adminGrid");
}

// 4. Inject the stats grid into the global user dashboard view
const insertTarget = `          {/* Main Controls & Connection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Connection Card */}`;

const newStatsGrid = `          {/* Main Controls & Connection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Global Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4 shadow-lg">
                <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Users className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{totalUsers}</h3>
                  <p className="text-xs text-neutral-400 mt-1">Total Pengguna Terdaftar</p>
                </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4 shadow-lg">
                <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400"><Smartphone className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {totalBots}
                    {totalBots > 0 ? (
                      <span className="relative flex h-3 w-3" title="Online">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    ) : (
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" title="Offline"></span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">Nomor Aktif Terhubung</p>
                </div>
              </div>
            </div>
            
            {/* Connection Card */}`;

if (code.includes(insertTarget)) {
  code = code.replace(insertTarget, newStatsGrid);
} else {
  console.log("Could not find insertTarget");
}

fs.writeFileSync('src/pages/Dashboard.tsx', code);
console.log("Patched successfully.");
