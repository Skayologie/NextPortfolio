"use client";

import { useActionState, useTransition, useState, useEffect, useRef } from "react";
import { saveTemplate, saveTemplateCustomization } from "@/app/actions/dashboard";
import { TEMPLATES, TEMPLATE_DEFAULTS } from "@/templates/types";
import type { TemplateCustomization } from "@/templates/types";
import { BUILTIN_FONTS, GOOGLE_FONT_PRESETS } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { CheckCircle2, Palette, X } from "lucide-react";

// ── tiny helpers ────────────────────────────────────────────────────
type AR = { success?: boolean; error?: string } | null;

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50";

// ── preview backgrounds ──────────────────────────────────────────────
const PREVIEW_BG: Record<string, string> = {
  minimal:  "bg-background",
  terminal: "bg-zinc-950",
  bento:    "bg-muted/50",
  magazine: "bg-background",
  sidebar:  "bg-muted/30",
  glass:    "bg-slate-900",
  creative: "bg-violet-600",
  buddy:    "bg-[#0e1c27]",
};

const MockLayout = ({ templateKey }: { templateKey: string }) => {
  switch (templateKey) {
    case "minimal":
      return (
        <div className="flex flex-col items-center gap-1.5 w-full px-3 py-2">
          <div className="size-8 rounded-full bg-foreground/20" />
          <div className="h-2 w-24 rounded bg-foreground/20" />
          <div className="h-1.5 w-32 rounded bg-foreground/10 mt-1" />
          <div className="grid grid-cols-3 gap-1 w-full mt-2">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-1.5 rounded bg-foreground/10" />)}
          </div>
        </div>
      );
    case "terminal":
      return (
        <div className="w-full px-3 py-2 font-mono text-[8px] text-green-400 space-y-0.5">
          <div className="text-zinc-500">$ whoami</div>
          <div>developer</div>
          <div className="text-zinc-500">$ ls work/</div>
          <div className="flex gap-2"><span>project_a</span><span>project_b</span></div>
          <div className="text-amber-400">{"const skills = ['JS', 'TS']"}</div>
        </div>
      );
    case "bento":
      return (
        <div className="w-full p-2 grid grid-cols-3 gap-1">
          <div className="col-span-2 h-8 rounded-lg bg-foreground/10 flex items-center gap-1 px-2">
            <div className="size-4 rounded-full bg-foreground/30" />
            <div className="h-1.5 w-8 rounded bg-foreground/20" />
          </div>
          <div className="h-8 rounded-lg bg-primary/20" />
          <div className="col-span-3 h-4 rounded-lg bg-foreground/5 grid grid-cols-4 gap-1 p-1">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="rounded bg-foreground/20" />)}
          </div>
          <div className="h-6 rounded-lg bg-foreground/10" />
          <div className="h-6 rounded-lg bg-foreground/10" />
          <div className="h-6 rounded-lg bg-primary/20" />
        </div>
      );
    case "magazine":
      return (
        <div className="w-full px-3 py-2 flex flex-col items-center gap-1">
          <div className="size-6 rounded-full bg-foreground/20" />
          <div className="h-4 w-28 rounded bg-foreground/30" />
          <div className="w-full border-b border-foreground/10 my-1" />
          {["w-full","w-3/4"].map((w, i) => (
            <div key={i} className="flex gap-2 w-full items-center">
              <span className="text-[8px] font-black text-foreground/20">{String(i + 1).padStart(2, "0")}</span>
              <div className={`${w} h-1.5 rounded bg-foreground/20`} />
            </div>
          ))}
        </div>
      );
    case "sidebar":
      return (
        <div className="w-full flex h-full min-h-[100px]">
          <div className="w-10 bg-foreground/5 border-r border-foreground/10 flex flex-col gap-1 p-1.5 shrink-0">
            <div className="size-5 rounded-full bg-foreground/20 mx-auto" />
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-1 rounded bg-foreground/15" />)}
          </div>
          <div className="flex-1 p-1.5 flex flex-col gap-1">
            <div className="h-1.5 w-20 rounded bg-foreground/20" />
            <div className="h-1 w-full rounded bg-foreground/10" />
            <div className="h-1 w-3/4 rounded bg-foreground/10" />
            <div className="mt-1 flex flex-col gap-0.5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-3 rounded bg-foreground/10 flex items-center gap-1 px-1">
                  <div className="size-2 rounded-sm bg-foreground/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "glass":
      return (
        <div className="w-full p-2 flex flex-col gap-1">
          <div className="h-8 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2 px-2">
            <div className="size-5 rounded-full bg-indigo-400/40" />
            <div className="h-1.5 w-12 rounded bg-white/20" />
          </div>
          <div className="h-5 rounded-xl border border-white/10 bg-white/5" />
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 rounded-xl border border-white/10 bg-white/5" />
            <div className="h-4 rounded-xl border border-white/10 bg-white/5" />
          </div>
        </div>
      );
    case "creative":
      return (
        <div className="w-full flex flex-col gap-1">
          <div className="h-10 bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center gap-2 px-3">
            <div className="size-6 rounded-full bg-white/30" />
            <div className="h-2 w-14 rounded bg-white/40" />
          </div>
          <div className="px-2 flex flex-col gap-1">
            <div className="flex gap-1 flex-wrap">
              {["from-violet-500 to-purple-600","from-cyan-500 to-blue-600","from-emerald-500 to-teal-600"].map(c => (
                <div key={c} className={`h-3 w-7 rounded-lg bg-gradient-to-r ${c}`} />
              ))}
            </div>
          </div>
        </div>
      );
    case "buddy":
      return (
        <div className="w-full flex flex-col gap-2 p-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-1 w-16 rounded bg-teal-400/60" />
              <div className="h-3 w-20 rounded bg-white/30" />
            </div>
            <div className="size-10 rounded-full bg-teal-400/20 border border-teal-400/30 flex items-center justify-center text-teal-400 text-[10px] font-bold">3D</div>
          </div>
        </div>
      );
    default:
      return <div className="w-full h-full bg-muted/20" />;
  }
};

// ── font preview ─────────────────────────────────────────────────────
function FontPreview({ family }: { family: string }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!family) { setLoaded(true); return; }
    if (BUILTIN_FONTS.some(f => f.family === family)) { setLoaded(true); return; }
    const encoded = family.replace(/ /g, "+");
    const url = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;600&display=swap`;
    const existing = document.querySelector(`link[href="${url}"]`);
    if (existing) { setLoaded(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = url;
    link.onload = () => setLoaded(true);
    document.head.appendChild(link);
  }, [family]);
  return (
    <span style={family ? { fontFamily: `'${family}', sans-serif` } : {}}
          className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-40"}`}>
      Aa
    </span>
  );
}

const FONT_SECTIONS = [
  { label: "Built-in", desc: "Pre-loaded, no external request", fonts: BUILTIN_FONTS.map(f => f.family) },
  { label: "Google Fonts presets", desc: "Loaded from Google Fonts", fonts: GOOGLE_FONT_PRESETS },
];

// ── customization panel ──────────────────────────────────────────────
function CustomizePanel({ templateKey, initial }: { templateKey: string; initial: TemplateCustomization }) {
  const defaults = TEMPLATE_DEFAULTS[templateKey] ?? initial;
  const [state, action, isPending] = useActionState<AR, FormData>(saveTemplateCustomization, null);
  const [, startTransition] = useTransition();

  const [accentColor, setAccentColor] = useState(initial.accentColor || defaults.accentColor);
  const [bgColor, setBgColor]         = useState(initial.bgColor     || defaults.bgColor);
  const [fontFamily, setFontFamily]   = useState(initial.fontFamily);
  const [customInput, setCustomInput] = useState(
    initial.fontFamily && !BUILTIN_FONTS.some(f => f.family === initial.fontFamily) && !GOOGLE_FONT_PRESETS.includes(initial.fontFamily)
      ? initial.fontFamily : ""
  );

  // reset when template changes
  const prevKey = useRef(templateKey);
  useEffect(() => {
    if (prevKey.current === templateKey) return;
    prevKey.current = templateKey;
    setAccentColor(initial.accentColor || defaults.accentColor);
    setBgColor(initial.bgColor || defaults.bgColor);
    setFontFamily(initial.fontFamily);
    setCustomInput(
      initial.fontFamily && !BUILTIN_FONTS.some(f => f.family === initial.fontFamily) && !GOOGLE_FONT_PRESETS.includes(initial.fontFamily)
        ? initial.fontFamily : ""
    );
  }, [templateKey, initial, defaults]);

  const isCustomFont  = !!customInput && fontFamily === customInput;
  const isPresetFont  = (f: string) => fontFamily === f && !isCustomFont;

  const selectFont = (f: string) => { setFontFamily(f); setCustomInput(""); };
  const applyCustom = (val: string) => {
    const v = val.trim(); setCustomInput(v);
    if (v) setFontFamily(v);
  };

  function handleSubmit() {
    const fd = new FormData();
    fd.set("template_key", templateKey);
    fd.set("accent_color",  accentColor);
    fd.set("bg_color",      bgColor);
    fd.set("font_family",   fontFamily);
    startTransition(() => action(fd));
  }

  const hasBg = ["buddy","glass","creative","terminal","sidebar"].includes(templateKey);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Palette className="size-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">
          Customize <span className="text-primary capitalize">{templateKey}</span>
        </h2>
      </div>

      {state?.error   && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-700 bg-green-500/10 rounded-lg px-3 py-2 flex items-center gap-1.5"><CheckCircle2 className="size-3.5" /> Saved! Refresh your portfolio to see changes.</p>}

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Accent color */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-foreground">Accent / Highlight Color</label>
          <p className="text-xs text-muted-foreground -mt-1">Section labels, borders, badges</p>
          <div className="flex items-center gap-3">
            <div className="relative size-9 rounded-lg border-2 border-border overflow-hidden shrink-0 cursor-pointer">
              <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="absolute inset-0 rounded-md" style={{ background: accentColor }} />
            </div>
            <input value={accentColor} onChange={e => setAccentColor(e.target.value)}
                   className={INPUT} placeholder="#14b8a6" maxLength={7} />
          </div>
        </div>

        {/* Background color (only for dark templates) */}
        {hasBg ? (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-foreground">Background Color</label>
            <p className="text-xs text-muted-foreground -mt-1">Main page background</p>
            <div className="flex items-center gap-3">
              <div className="relative size-9 rounded-lg border-2 border-border overflow-hidden shrink-0 cursor-pointer">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="absolute inset-0 rounded-md" style={{ background: bgColor }} />
              </div>
              <input value={bgColor} onChange={e => setBgColor(e.target.value)}
                     className={INPUT} placeholder="#0e1c27" maxLength={7} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-foreground">Background Color</label>
            <p className="text-xs text-muted-foreground -mt-1">Controlled by the global Style theme</p>
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-dashed border-border text-xs text-muted-foreground">
              Use the Style section to change background
            </div>
          </div>
        )}
      </div>

      {/* Font family */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xs font-semibold text-foreground">Font Family</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Overrides the global font for this template</p>
        </div>

        {FONT_SECTIONS.map(section => (
          <div key={section.label} className="flex flex-col gap-2">
            <div>
              <p className="text-xs font-medium text-foreground">{section.label}</p>
              <p className="text-xs text-muted-foreground">{section.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.fonts.map(f => (
                <button key={f} type="button" onClick={() => selectFont(f)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-all",
                    isPresetFont(f) ? "border-foreground bg-muted" : "border-border hover:border-muted-foreground/50"
                  )}>
                  <span className="text-lg font-semibold leading-none w-7 text-center">
                    <FontPreview family={f} />
                  </span>
                  <span className="text-xs text-muted-foreground">{f}</span>
                  {isPresetFont(f) && <CheckCircle2 className="size-3 text-foreground" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Google Font */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs font-medium text-foreground">Custom Google Font</p>
            <p className="text-xs text-muted-foreground">Any name from fonts.google.com — exact spelling matters</p>
          </div>
          <div className="flex gap-2 items-center">
            <input value={customInput} onChange={e => applyCustom(e.target.value)}
                   className={INPUT} placeholder="e.g. Bebas Neue, Montserrat, Lato…" />
            {customInput && (
              <button type="button" onClick={() => { setCustomInput(""); setFontFamily(""); }}
                      className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            )}
          </div>
          {customInput && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
              <span className="text-2xl font-semibold"><FontPreview family={customInput} /></span>
              <div>
                <p className="text-xs font-medium text-foreground">{customInput}</p>
                <p className="text-xs text-muted-foreground">Custom Google Font{isCustomFont ? " — selected" : ""}</p>
              </div>
              {!isCustomFont && (
                <button type="button" onClick={() => setFontFamily(customInput)}
                        className="ml-auto text-xs px-2 py-1 rounded border border-border hover:bg-muted">
                  Use this
                </button>
              )}
              {isCustomFont && <CheckCircle2 className="size-4 text-green-600 ml-auto" />}
            </div>
          )}
        </div>

        {fontFamily && (
          <p className="text-xs text-muted-foreground">
            Active font: <span className="font-medium text-foreground">{fontFamily || "Default"}</span>
            {fontFamily && (
              <button type="button" onClick={() => { setFontFamily(""); setCustomInput(""); }}
                      className="ml-2 text-muted-foreground/60 hover:text-muted-foreground underline">
                clear
              </button>
            )}
          </p>
        )}
      </div>

      {/* Live mini-preview */}
      <div className="rounded-xl border-2 border-dashed border-border p-4 flex flex-col gap-1.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Preview</p>
        <p className="text-base font-semibold" style={{
          color: accentColor,
          fontFamily: fontFamily ? `'${fontFamily}', sans-serif` : undefined,
        }}>
          Section Title
        </p>
        <p className="text-sm text-muted-foreground" style={{
          fontFamily: fontFamily ? `'${fontFamily}', sans-serif` : undefined,
        }}>
          This is how your content text will look with the selected font.
        </p>
        {hasBg && (
          <div className="mt-2 h-8 rounded-lg flex items-center px-3"
               style={{ background: bgColor }}>
            <span className="text-xs font-medium" style={{ color: accentColor,
              fontFamily: fontFamily ? `'${fontFamily}', sans-serif` : undefined }}>
              Background preview
            </span>
          </div>
        )}
      </div>

      <button type="button" onClick={handleSubmit} disabled={isPending}
              style={{ width: "fit-content" }} className={BTN}>
        {isPending ? "Saving…" : "Save Customization"}
      </button>
    </div>
  );
}

// ── main form ────────────────────────────────────────────────────────
export default function TemplatesForm({
  current,
  customizations,
}: {
  current: string;
  customizations: Record<string, TemplateCustomization>;
}) {
  const [activeKey, setActiveKey] = useState(current);
  const [selected, setSelected]   = useState(current);
  const [templateState, templateAction] = useActionState<AR, FormData>(saveTemplate, null);
  const [, startTransition] = useTransition();

  function handleSelect(key: string) {
    setSelected(key);
    if (key === activeKey) return;
    const fd = new FormData();
    fd.set("template", key);
    startTransition(() => {
      templateAction(fd);
      setActiveKey(key);
    });
  }

  const selectedCustomization = customizations[selected] ?? TEMPLATE_DEFAULTS[selected] ?? {
    accentColor: "#3b82f6", bgColor: "", fontFamily: "",
  };

  return (
    <div className="flex flex-col gap-6">
      {templateState?.error && <p className="text-sm text-destructive">{templateState.error}</p>}
      {templateState?.success && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-4" /> Template updated — portfolio is now live with the new design.
        </div>
      )}

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map(t => {
          const isActive   = t.key === activeKey;
          const isSelected = t.key === selected;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => handleSelect(t.key)}
              className={cn(
                "group text-left rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive    ? "border-primary ring-2 ring-primary/20 shadow-md" :
                isSelected  ? "border-primary/50 ring-1 ring-primary/10" :
                              "border-border hover:border-primary/40"
              )}
            >
              <div className={cn("h-32 w-full relative flex items-start justify-center overflow-hidden pt-1", PREVIEW_BG[t.key])}>
                <MockLayout templateKey={t.key} />
                {isActive && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-0.5 shadow">
                    <CheckCircle2 className="size-3.5" />
                  </div>
                )}
              </div>
              <div className={cn("p-4 border-t border-border", isSelected ? "bg-primary/5" : "bg-card")}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{t.label}</p>
                  <div className="flex items-center gap-2">
                    {isActive && <span className="text-xs font-semibold text-primary">Active</span>}
                    {isSelected && (
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <Palette className="size-3" /> Edit
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{t.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Customization panel — always visible for selected template */}
      <div className="border-t border-border pt-6">
        <CustomizePanel
          key={selected}
          templateKey={selected}
          initial={selectedCustomization}
        />
      </div>
    </div>
  );
}
