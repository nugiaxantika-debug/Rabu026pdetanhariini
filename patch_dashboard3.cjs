const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

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
  fs.writeFileSync('src/pages/Dashboard.tsx', code);
  console.log("Patched useEffect successfully.");
} else {
  console.log("Could not find oldUseEffect");
}

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
  fs.writeFileSync('src/pages/Dashboard.tsx', code);
  console.log("Removed admin grid.");
} else {
  console.log("Could not find adminGrid");
}

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
  fs.writeFileSync('src/pages/Dashboard.tsx', code);
  console.log("Inserted new stats grid.");
} else {
  console.log("Could not find insertTarget");
}

