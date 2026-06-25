"use client";

import { useActionState, useState, useEffect, useTransition } from "react";
import { saveTheme, type AR } from "@/app/actions/dashboard";
import { THEMES, BUILTIN_FONTS, GOOGLE_FONT_PRESETS } from "@/lib/themes";
import { Check, X } from "lucide-react";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN_PRIMARY = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50";

const FONT_SECTIONS = [
  {
    label: "Built-in",
    desc: "Pre-loaded, no external request",
    fonts: BUILTIN_FONTS.map(f => f.family),
  },
  {
    label: "Google Fonts presets",
    desc: "Loaded from Google Fonts",
    fonts: GOOGLE_FONT_PRESETS,
  },
];

function FontPreview({ family }: { family: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!family) { setLoaded(true); return; }
    const isBuiltin = BUILTIN_FONTS.some(f => f.family === family);
    if (isBuiltin) { setLoaded(true); return; }

    const encoded = family.replace(/ /g, "+");
    const url = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;600&display=swap`;
    const existing = document.querySelector(`link[href="${url}"]`);
    if (existing) { setLoaded(true); return; }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => setLoaded(true);
    document.head.appendChild(link);
  }, [family]);

  const style = family ? { fontFamily: `'${family}', sans-serif` } : {};

  return (
    <span style={style} className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-40"}`}>
      Aa
    </span>
  );
}

export default function ThemeForm({ current }: { current: { themeKey: string; fontFamily: string } }) {
  const [state, action, isPending] = useActionState<AR, FormData>(saveTheme, null);
  const [themeKey, setThemeKey] = useState(current.themeKey);
  const [fontFamily, setFontFamily] = useState(current.fontFamily);
  const [customInput, setCustomInput] = useState(
    current.fontFamily && !BUILTIN_FONTS.some(f => f.family === current.fontFamily) && !GOOGLE_FONT_PRESETS.includes(current.fontFamily)
      ? current.fontFamily
      : ""
  );
  const [, startTransition] = useTransition();

  const isCustom = !!customInput && fontFamily === customInput;
  const isPreset = (f: string) => fontFamily === f && !isCustom;

  const selectFont = (f: string) => {
    setFontFamily(f);
    setCustomInput("");
  };

  const applyCustom = (val: string) => {
    const trimmed = val.trim();
    setCustomInput(trimmed);
    if (trimmed) setFontFamily(trimmed);
  };

  return (
    <form action={action} className="flex flex-col gap-8">
      {state?.error && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2 flex items-center gap-1.5"><Check className="size-3.5" />Theme applied! Refresh your portfolio to see the change.</p>}

      <input type="hidden" name="theme" value={themeKey} />
      <input type="hidden" name="font_family" value={fontFamily} />

      {/* Color themes */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Color Theme</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {THEMES.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => setThemeKey(t.key)}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                themeKey === t.key
                  ? "border-foreground shadow-sm scale-[1.03]"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <div className="size-10 rounded-lg border border-black/10 shadow-inner overflow-hidden relative" style={{ background: t.preview.bg }}>
                <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: t.preview.primary }} />
                <div className="absolute top-1 left-1 right-1 h-4 rounded-sm" style={{ background: t.preview.muted }} />
              </div>
              <span className="text-xs font-medium text-foreground">{t.label}</span>
              {themeKey === t.key && (
                <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-foreground flex items-center justify-center">
                  <Check className="size-2.5 text-background" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font picker */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">Font</h2>

        {FONT_SECTIONS.map(section => (
          <div key={section.label} className="flex flex-col gap-2">
            <div>
              <p className="text-xs font-medium text-foreground">{section.label}</p>
              <p className="text-xs text-muted-foreground">{section.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.fonts.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => selectFont(f)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                    isPreset(f)
                      ? "border-foreground bg-muted"
                      : "border-border hover:border-muted-foreground/50"
                  }`}
                >
                  <span className="text-lg font-semibold leading-none w-7 text-center">
                    <FontPreview family={f} />
                  </span>
                  <span className="text-xs text-muted-foreground">{f}</span>
                  {isPreset(f) && <Check className="size-3 text-foreground" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Google Font */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs font-medium text-foreground">Custom Google Font</p>
            <p className="text-xs text-muted-foreground">Any name from <span className="underline">fonts.google.com</span> — exact spelling matters</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={customInput}
              onChange={e => startTransition(() => applyCustom(e.target.value))}
              className={INPUT}
              placeholder="e.g. Bebas Neue, Montserrat, Lato…"
            />
            {customInput && (
              <button type="button" onClick={() => { setCustomInput(""); setFontFamily(""); }} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            )}
          </div>
          {customInput && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
              <span className="text-2xl font-semibold"><FontPreview family={customInput} /></span>
              <div>
                <p className="text-xs font-medium text-foreground">{customInput}</p>
                <p className="text-xs text-muted-foreground">Custom Google Font{isCustom ? " — selected" : ""}</p>
              </div>
              {!isCustom && (
                <button type="button" onClick={() => setFontFamily(customInput)} className="ml-auto text-xs px-2 py-1 rounded border border-border hover:bg-muted">
                  Use this
                </button>
              )}
              {isCustom && <Check className="size-4 text-green-600 ml-auto" />}
            </div>
          )}
        </div>

        {/* Current selection summary */}
        {fontFamily && (
          <p className="text-xs text-muted-foreground">
            Active font: <span className="font-medium text-foreground">{fontFamily || "Geist (default)"}</span>
          </p>
        )}
      </div>

      {/* Preview strip */}
      {(() => {
        const t = THEMES.find(x => x.key === themeKey)!;
        const fontStyle = fontFamily ? { fontFamily: `'${fontFamily}', sans-serif` } : {};
        return (
          <div className="rounded-xl border-2 p-4 flex flex-col gap-2 transition-all duration-300" style={{ background: t.preview.bg, borderColor: t.preview.muted }}>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.preview.primary }}>Preview</p>
            <p className="text-base font-semibold" style={{ color: "#111", ...fontStyle }}>Hi, I&apos;m Jawad Boulmal</p>
            <p className="text-sm" style={{ color: "#555", ...fontStyle }}>Full Stack Developer passionate about building great software.</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: t.preview.primary, color: t.preview.bg, ...fontStyle }}>Primary</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium border" style={{ background: t.preview.muted, color: "#333", ...fontStyle }}>Badge</span>
            </div>
          </div>
        );
      })()}

      <button type="submit" disabled={isPending} style={{ width: "fit-content" }} className={BTN_PRIMARY}>
        {isPending ? "Applying…" : "Apply Theme"}
      </button>
    </form>
  );
}
