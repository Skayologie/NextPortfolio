"use client";

import { useActionState, useState } from "react";
import { saveHero } from "@/app/actions/dashboard";
import { ImageUpload } from "@/components/dashboard/image-upload";

const INPUT =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";

type Props = {
  initialHero: { displayName: string; description: string; avatarUrl: string };
};

export default function HeroForm({ initialHero }: Props) {
  const [state, action, isPending] = useActionState(saveHero, null);
  const [avatarUrl, setAvatarUrl] = useState(initialHero.avatarUrl);

  return (
    <form action={action} className="flex flex-col gap-5">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2">
          Saved! Changes are live on your portfolio.
        </p>
      )}

      {/* Avatar */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Avatar</label>
        <div className="flex items-start gap-4">
          {/* Preview */}
          <div className="shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="size-20 rounded-full border-2 border-border object-cover"
                onError={() => setAvatarUrl("")}
              />
            ) : (
              <div className="size-20 rounded-full border-2 border-border bg-muted flex items-center justify-center text-muted-foreground text-xs">
                No image
              </div>
            )}
          </div>
          {/* URL field + upload button */}
          <div className="flex-1 flex flex-col gap-2">
            <input
              name="avatar_url"
              disabled={isPending}
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className={INPUT}
              placeholder="/your-photo.png or https://…"
            />
            <ImageUpload
              label="Upload photo"
              onUpload={(url) => setAvatarUrl(url)}
            />
            <p className="text-xs text-muted-foreground">
              Upload a file or paste a URL directly.
            </p>
          </div>
        </div>
      </div>

      {/* Display name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          First Name{" "}
          <span className="text-muted-foreground font-normal">(shown as &quot;Hi, I&apos;m ___&quot;)</span>
        </label>
        <input
          name="display_name"
          required
          disabled={isPending}
          defaultValue={initialHero.displayName}
          className={INPUT}
          placeholder="Jawad"
        />
      </div>

      {/* Tagline */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Tagline</label>
        <textarea
          name="description"
          required
          rows={3}
          disabled={isPending}
          defaultValue={initialHero.description}
          className={INPUT + " resize-y"}
          placeholder="Full Stack Developer. I love building…"
        />
        <p className="text-xs text-muted-foreground">
          Shown directly below your name in the hero section.
        </p>
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
