"use client";

import { useActionState } from "react";
import { saveAbout } from "@/app/actions/dashboard";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";

export default function AboutForm({ initialContent }: { initialContent: string }) {
  const [state, action, isPending] = useActionState(saveAbout, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2">Saved successfully!</p>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Summary</label>
        <textarea
          name="content"
          rows={8}
          required
          disabled={isPending}
          defaultValue={initialContent}
          className={INPUT + " resize-y"}
          placeholder="Write something about yourself…"
        />
        <p className="text-xs text-muted-foreground">Markdown is supported.</p>
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
