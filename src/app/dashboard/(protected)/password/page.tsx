"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/actions/auth";
import { Check } from "lucide-react";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN_PRIMARY = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50";

export default function PasswordPage() {
  const [error, action, isPending] = useActionState<string | null, FormData>(changePassword, null);
  const success = error === null && !isPending;

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-1 text-foreground">Change Password</h1>
      <p className="text-sm text-muted-foreground mb-6">Update your dashboard login password.</p>

      <form action={action} className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-card">
        {error && (
          <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2 flex items-center gap-1.5">
            <Check className="size-3.5" /> Password updated successfully.
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Current Password</label>
          <input name="current" type="password" required disabled={isPending} className={INPUT} autoComplete="current-password" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">New Password</label>
          <input name="next" type="password" required disabled={isPending} minLength={8} className={INPUT} autoComplete="new-password" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Confirm New Password</label>
          <input name="confirm" type="password" required disabled={isPending} className={INPUT} autoComplete="new-password" />
        </div>

        <button type="submit" disabled={isPending} style={{ width: "fit-content" }} className={BTN_PRIMARY}>
          {isPending ? "Saving…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
