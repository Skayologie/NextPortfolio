"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, action, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm border border-border rounded-xl p-8 bg-card shadow-sm">
        <h1 className="text-xl font-bold mb-1 text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter your password to continue.</p>
        <form action={action} className="flex flex-col gap-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-foreground text-background rounded-lg py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isPending ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
