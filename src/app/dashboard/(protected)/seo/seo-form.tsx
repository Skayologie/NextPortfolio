"use client";

import { useActionState, useState } from "react";
import { saveSeoSettings } from "@/app/actions/dashboard";
import type { SeoSettings } from "@/lib/portfolio-data";

const INPUT =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";

type Props = { initialSeo: SeoSettings };

export default function SeoForm({ initialSeo }: Props) {
  const [state, action, isPending] = useActionState(saveSeoSettings, null);
  const [desc, setDesc] = useState(initialSeo.description);

  return (
    <form action={action} className="flex flex-col gap-6">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2">
          Saved! Changes are live on your portfolio.
        </p>
      )}

      {/* Site Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Site Title
          <span className="ml-1 text-muted-foreground font-normal">— shown in browser tab and Google results</span>
        </label>
        <input
          name="seo_title"
          required
          disabled={isPending}
          defaultValue={initialSeo.title}
          className={INPUT}
          placeholder="Jawad Boulmal | Full Stack Developer"
        />
      </div>

      {/* Meta Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Meta Description
          <span className="ml-1 text-muted-foreground font-normal">— the text snippet shown under your link on Google</span>
        </label>
        <textarea
          name="seo_description"
          required
          rows={3}
          disabled={isPending}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={INPUT + " resize-y"}
          placeholder="Jawad Boulmal — Full Stack Developer in Casablanca, Morocco…"
          maxLength={160}
        />
        <p className={`text-xs tabular-nums ${desc.length > 155 ? "text-orange-500" : "text-muted-foreground"}`}>
          {desc.length}/160 characters {desc.length > 155 && "— keep it under 160 for best results"}
        </p>
      </div>

      {/* Keywords */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Keywords
          <span className="ml-1 text-muted-foreground font-normal">— comma-separated</span>
        </label>
        <textarea
          name="seo_keywords"
          rows={4}
          disabled={isPending}
          defaultValue={initialSeo.keywords}
          className={INPUT + " resize-y font-mono text-xs"}
          placeholder="Jawad Boulmal, Full Stack Developer, Web Developer Morocco, Java, Spring Boot…"
        />
        <p className="text-xs text-muted-foreground">
          Separate each keyword with a comma. Focus on terms people actually search for.
        </p>
      </div>

      {/* OG Image */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          OG Image URL
          <span className="ml-1 text-muted-foreground font-normal">— 1200×630px image shown when sharing your link</span>
        </label>
        <input
          name="seo_og_image"
          disabled={isPending}
          defaultValue={initialSeo.ogImage}
          className={INPUT}
          placeholder="/og-image.png"
        />
        <p className="text-xs text-muted-foreground">
          Use <code className="bg-muted px-1 rounded">/og-image.png</code> for your default image or paste a full URL.
        </p>
      </div>

      {/* Google Verification */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Google Search Console Verification Code
        </label>
        <input
          name="seo_google_verification"
          disabled={isPending}
          defaultValue={initialSeo.googleVerification}
          className={INPUT}
          placeholder="abc123def456…"
        />
        <p className="text-xs text-muted-foreground">
          Paste only the <strong>code value</strong> from the meta tag Google gives you — not the full tag.
          Example: if Google shows <code className="bg-muted px-1 rounded">{'<meta name="google-site-verification" content="abc123"/>'}</code>,
          paste only <code className="bg-muted px-1 rounded">abc123</code>.
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending ? "Saving…" : "Save SEO Settings"}
        </button>
      </div>
    </form>
  );
}
