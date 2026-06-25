"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import {
  FileText, Briefcase, GraduationCap, FolderOpen,
  Trophy, MessageSquare, ExternalLink, LogOut, User, Cpu, KeyRound,
} from "lucide-react";

const navItems = [
  { href: "/dashboard/hero", icon: User, label: "Hero" },
  { href: "/dashboard/about", icon: FileText, label: "About" },
  { href: "/dashboard/work", icon: Briefcase, label: "Work" },
  { href: "/dashboard/education", icon: GraduationCap, label: "Education" },
  { href: "/dashboard/skills", icon: Cpu, label: "Skills" },
  { href: "/dashboard/projects", icon: FolderOpen, label: "Projects" },
  { href: "/dashboard/hackathons", icon: Trophy, label: "Hackathons" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/password", icon: KeyRound, label: "Password" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="px-4 py-5 border-b border-border">
        <p className="text-sm font-semibold text-foreground">Jawad Boulmal  </p>
      </div>
      <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname === href
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t border-border flex flex-col gap-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ExternalLink className="size-4 shrink-0" />
          View Portfolio
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-600 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="size-4 shrink-0" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
