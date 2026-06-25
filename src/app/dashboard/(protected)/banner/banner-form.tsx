"use client";

import { useActionState, useState } from "react";
import { saveBanner, type AR } from "@/app/actions/dashboard";
import { Eye, EyeOff } from "lucide-react";
import type { BannerData } from "@/lib/portfolio-data";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN_PRIMARY = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50";

const STYLE_OPTIONS = [
  { value: "info",    label: "Info",    cls: "bg-blue-50 border-blue-200 text-blue-900" },
  { value: "success", label: "Success", cls: "bg-green-50 border-green-200 text-green-900" },
  { value: "warning", label: "Warning", cls: "bg-amber-50 border-amber-200 text-amber-900" },
  { value: "promo",   label: "Promo",   cls: "bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200 text-violet-900" },
];

export default function BannerForm({ current }: { current: BannerData }) {
  const [state, action, isPending] = useActionState<AR, FormData>(saveBanner, null);
  const [message, setMessage] = useState(current.message);
  const [style, setStyle] = useState<BannerData["style"]>(current.style);
  const [linkText, setLinkText] = useState(current.linkText);
  const [linkUrl, setLinkUrl] = useState(current.linkUrl);
  const [isActive, setIsActive] = useState(current.isActive);

  const previewCls = STYLE_OPTIONS.find(o => o.value === style)?.cls ?? "";

  return (
    <form action={action} className="flex flex-col gap-5">
      {state?.error && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2">Saved! Changes are live on your portfolio.</p>}

      {/* Live preview */}
      {message && (
        <div className={`rounded-xl border px-4 py-3 text-sm text-center transition-all duration-300 ${previewCls}`}>
          {message}
          {linkUrl && linkText && <> <span className="font-semibold underline">{linkText} →</span></>}
          <span className="ml-2 opacity-40 text-xs">[×]</span>
        </div>
      )}

      <div className="flex flex-col gap-5 p-4 border border-border rounded-xl bg-card">
        {/* Active toggle */}
        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/30">
          <div>
            <p className="text-sm font-medium text-foreground">Banner visible</p>
            <p className="text-xs text-muted-foreground">Toggle to show or hide on your site</p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive(v => !v)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              isActive
                ? "bg-green-500/10 border-green-300 text-green-700 dark:text-green-400"
                : "bg-muted border-border text-muted-foreground"
            }`}
          >
            {isActive ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            {isActive ? "Visible" : "Hidden"}
          </button>
          <input type="hidden" name="is_active" value={isActive ? "true" : "false"} />
        </div>

        {/* Style picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground">Style</label>
          <input type="hidden" name="style" value={style} />
          <div className="grid grid-cols-4 gap-2">
            {STYLE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStyle(opt.value as BannerData["style"])}
                className={`rounded-lg border px-2 py-2.5 text-xs font-medium transition-all ${opt.cls} ${
                  style === opt.value ? "ring-2 ring-offset-1 ring-foreground/30 scale-[1.03]" : "opacity-60 hover:opacity-90"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Message *</label>
          <textarea
            name="message"
            rows={2}
            disabled={isPending}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className={INPUT + " resize-none"}
            placeholder="I'm currently open to new opportunities!"
          />
        </div>

        {/* Optional link */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Link text <span className="font-normal opacity-60">(optional)</span></label>
            <input name="link_text" disabled={isPending} value={linkText} onChange={e => setLinkText(e.target.value)} className={INPUT} placeholder="Contact me" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">Link URL <span className="font-normal opacity-60">(optional)</span></label>
            <input name="link_url" disabled={isPending} value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className={INPUT} placeholder="#contact" />
          </div>
        </div>

        <button type="submit" disabled={isPending} style={{ width: "fit-content" }} className={BTN_PRIMARY}>
          {isPending ? "Saving…" : "Save Banner"}
        </button>
      </div>
    </form>
  );
}
