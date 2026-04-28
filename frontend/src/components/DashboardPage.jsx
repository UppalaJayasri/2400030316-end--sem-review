import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../api/client";

export function DashboardPage({ user, token }) {
  const [stats, setStats] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      const s = await apiClient.getAdminStats(token);
      if (s.totalArticles === undefined) {
        try {
          const arts = await apiClient.getAllArticles(token);
          s.totalArticles = arts.length;
        } catch {
          s.totalArticles = 0;
        }
      }
      setStats(s);
    } catch {
      // Error handled silently
    }
  }, [token]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  if (user.role !== "ADMIN") {
    return (
      <main className="px-5 pt-20 pb-10 sm:px-8 lg:px-12">
        <section className="mx-auto w-[min(900px,100%)] rounded-3xl border-2 border-red-400/30 bg-red-500/10 p-8 text-red-100">
          <h1 className="text-2xl font-bold">Access Restricted</h1>
          <p className="mt-3 text-sm leading-relaxed">This page is only for admin users.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="px-5 pt-20 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto w-[min(1300px,100%)]">
        <div className="mb-14 text-center">
          <p className="text-lg font-bold uppercase tracking-[0.3em] text-amber-300">Admin Panel</p>
          <h1 className="mt-2 text-7xl font-black text-white tracking-tight">Dashboard</h1>
        </div>
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
          {/* Hero Welcome Section */}
          <div className="relative mb-10 overflow-hidden rounded-[2.5rem] border-2 border-amber-400 bg-slate-900/40 p-10 shadow-2xl backdrop-blur-md">
            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black text-white md:text-5xl">
                    Welcome again, {user.name}!
                  </h2>
                  <span className="text-4xl text-amber-400">✨</span>
                </div>
                <p className="mt-3 text-lg font-medium text-slate-300 opacity-80">
                  Your heritage command center is ready. Here's a pulse of the platform.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 border border-white/10">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">System Status</p>
                  <p className="text-sm font-bold text-white">All Systems Optimal</p>
                </div>
              </div>
            </div>
            {/* Decorative background glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]"></div>
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"></div>
          </div>

          {stats && (
            <div className="space-y-10">
              {/* Stat Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                  title="Global Explorers" 
                  value={stats.totalUsers} 
                  icon="👥" 
                  color="blue" 
                  description="Registered enthusiasts"
                />
                <StatCard 
                  title="Heritage Sites" 
                  value={stats.totalPlaces} 
                  icon="🏛️" 
                  color="emerald" 
                  description="Landmarks in gallery"
                />
                <StatCard 
                  title="Active Quizzes" 
                  value={stats.totalQuizzes} 
                  icon="🎯" 
                  color="purple" 
                  description="Cultural challenges"
                />
                <StatCard 
                  title="Expert Articles" 
                  value={stats.totalArticles ?? 0} 
                  icon="📜" 
                  color="amber" 
                  description="Published insights"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color, description }) {
  const colorMap = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400",
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400",
  };

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br ${colorMap[color]} p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider opacity-80">{title}</p>
          <p className="mt-4 text-5xl font-black text-white">{value}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-slate-400">{description}</p>
      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors"></div>
    </div>
  );
}


