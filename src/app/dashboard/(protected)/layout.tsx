import DashboardNav from "@/components/dashboard/nav";

export const dynamic = "force-dynamic";

export default function ProtectedDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav />
      <main className="flex-1 overflow-auto p-6 pb-28 md:pb-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
