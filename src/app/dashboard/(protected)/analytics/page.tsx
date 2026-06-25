import { createAdminClient } from "@/lib/supabase-admin";
import { Users, Eye, TrendingUp, Calendar } from "lucide-react";

async function getStats() {
  const db = createAdminClient();

  const now = new Date();
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6); weekStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
  const last30 = new Date(now); last30.setDate(now.getDate() - 29); last30.setHours(0, 0, 0, 0);

  const [{ count: total }, { count: today }, { count: week }, { count: month }, { data: raw }, { data: allIps }] = await Promise.all([
    db.from("page_views").select("*", { count: "exact", head: true }),
    db.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", todayStart.toISOString()),
    db.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", weekStart.toISOString()),
    db.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", monthStart.toISOString()),
    db.from("page_views").select("page, created_at, ip_address").gte("created_at", last30.toISOString()).order("created_at"),
    db.from("page_views").select("ip_address"),
  ]);

  // Unique visitors (distinct non-empty IPs)
  const uniqueIPs = new Set((allIps ?? []).map(r => r.ip_address).filter(Boolean));
  const uniqueVisitors = uniqueIPs.size;

  // Unique visitors this month
  const monthIPs = new Set((raw ?? []).filter(r => r.created_at >= monthStart.toISOString()).map(r => r.ip_address).filter(Boolean));

  // Daily counts for last 30 days
  const dailyMap: Record<string, number> = {};
  const dailyIPMap: Record<string, Set<string>> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailyMap[key] = 0;
    dailyIPMap[key] = new Set();
  }
  for (const row of (raw ?? [])) {
    const day = row.created_at.slice(0, 10);
    if (day in dailyMap) {
      dailyMap[day]++;
      if (row.ip_address) dailyIPMap[day].add(row.ip_address);
    }
  }

  // Page breakdown
  const pageMap: Record<string, number> = {};
  for (const row of (raw ?? [])) {
    pageMap[row.page] = (pageMap[row.page] ?? 0) + 1;
  }
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return {
    total: total ?? 0,
    today: today ?? 0,
    week: week ?? 0,
    month: month ?? 0,
    uniqueVisitors,
    uniqueThisMonth: monthIPs.size,
    daily: Object.entries(dailyMap).map(([day, views]) => ({ day, views, uniq: dailyIPMap[day].size })),
    topPages,
  };
}

function StatCard({ label, value, icon: Icon, sub }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; sub?: string }) {
  return (
    <div className="flex flex-col gap-2 p-4 border border-border rounded-xl bg-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default async function AnalyticsPage() {
  const stats = await getStats();
  const maxDaily = Math.max(...stats.daily.map(d => d.views), 1);

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-bold mb-1 text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Portfolio page views — each visitor counted once per session.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total views" value={stats.total} icon={Eye} />
        <StatCard label="Unique visitors" value={stats.uniqueVisitors} icon={Users} sub="distinct IPs, all time" />
        <StatCard label="This month" value={stats.month} icon={Calendar} sub={`${stats.uniqueThisMonth} unique`} />
        <StatCard label="Today" value={stats.today} icon={TrendingUp} />
      </div>

      {/* Daily bar chart */}
      <div className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-card">
        <p className="text-sm font-semibold text-foreground">Last 30 days</p>
        <div className="flex items-end gap-0.5 h-28">
          {stats.daily.map(({ day, views, uniq }) => {
            const pct = maxDaily > 0 ? (views / maxDaily) * 100 : 0;
            const isToday = day === new Date().toISOString().slice(0, 10);
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1 group relative" title={`${day}: ${views} views, ${uniq} unique`}>
                <div
                  className={`w-full rounded-t-sm transition-all ${isToday ? "bg-foreground" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"}`}
                  style={{ height: `${Math.max(pct, views > 0 ? 4 : 0)}%` }}
                />
                {views > 0 && (
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {views} views · {uniq} unique
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{stats.daily[0]?.day ? new Date(stats.daily[0].day).toLocaleDateString("en", { month: "short", day: "numeric" }) : ""}</span>
          <span>Today</span>
        </div>
      </div>

      {/* Top pages */}
      {stats.topPages.length > 0 && (
        <div className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-card">
          <p className="text-sm font-semibold text-foreground">Top pages <span className="text-muted-foreground font-normal">(last 30 days)</span></p>
          <div className="flex flex-col gap-2">
            {stats.topPages.map(([page, count]) => {
              const pct = stats.topPages[0][1] > 0 ? (count / stats.topPages[0][1]) * 100 : 0;
              return (
                <div key={page} className="flex items-center gap-3">
                  <span className="text-sm text-foreground font-mono truncate w-36 shrink-0">{page || "/"}</span>
                  <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground tabular-nums w-8 text-right shrink-0">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats.total === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Eye className="size-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No views yet. Share your portfolio to start collecting data.</p>
        </div>
      )}
    </div>
  );
}
