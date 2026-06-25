"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSkill, deleteSkill, type AR } from "@/app/actions/dashboard";
import { SKILL_ICONS, SKILL_ICON_KEYS } from "@/lib/skill-icons";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN = "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50";
const BTN_PRIMARY = `${BTN} bg-foreground text-background hover:opacity-90`;
const BTN_GHOST = `${BTN} border border-border text-muted-foreground hover:text-foreground hover:bg-muted`;

type Item = { id: string; name: string; icon_key: string; icon_url: string; sort_order: number };

function SkillForm({ action, isPending, state, item }: { action: (fd: FormData) => void; isPending: boolean; state: AR; item?: Item }) {
  const [iconKey, setIconKey] = useState(item?.icon_key ?? "");
  const [iconUrl, setIconUrl] = useState(item?.icon_url ?? "");

  const SvgIcon = !iconUrl ? SKILL_ICONS[iconKey] : null;

  return (
    <form action={action} className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-card">
      {item && <input type="hidden" name="id" value={item.id} />}
      {state?.error && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Skill Name *</label>
          <input name="name" required disabled={isPending} defaultValue={item?.name} className={INPUT} placeholder="TypeScript" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Sort Order</label>
          <input name="sort_order" type="number" disabled={isPending} defaultValue={item?.sort_order ?? 0} className={INPUT} />
        </div>
      </div>

      {/* Icon — live preview */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground">Icon</label>
        <div className="flex items-start gap-4 p-3 border border-border rounded-lg bg-muted/30">
          {/* Preview */}
          <div className="size-10 rounded-lg border border-border bg-background flex items-center justify-center shrink-0">
            {iconUrl ? (
              <img src={iconUrl} alt="" className="size-6 object-contain" onError={() => setIconUrl("")} />
            ) : SvgIcon ? (
              <SvgIcon className="size-6" />
            ) : (
              <span className="text-xs text-muted-foreground">?</span>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-3">
            {/* Upload PNG */}
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-foreground">Custom PNG <span className="text-muted-foreground font-normal">(overrides SVG icon)</span></p>
              <div className="flex items-center gap-2">
                <input
                  name="icon_url"
                  disabled={isPending}
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  className={INPUT + " text-xs"}
                  placeholder="https://… or upload below"
                />
                {iconUrl && (
                  <button type="button" onClick={() => setIconUrl("")} className={BTN_GHOST + " !px-2 !py-1.5 text-xs shrink-0"}>
                    Clear
                  </button>
                )}
              </div>
              <ImageUpload label="Upload PNG icon" onUpload={(url) => setIconUrl(url)} />
            </div>

            {/* SVG icon select (used when no PNG uploaded) */}
            {!iconUrl && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-foreground">Built-in SVG icon</p>
                <select
                  name="icon_key"
                  disabled={isPending}
                  value={iconKey}
                  onChange={(e) => setIconKey(e.target.value)}
                  className={INPUT + " text-xs"}
                >
                  <option value="">— no icon —</option>
                  {SKILL_ICON_KEYS.map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            )}
            {iconUrl && <input type="hidden" name="icon_key" value={iconKey} />}
          </div>
        </div>
      </div>

      <div>
        <button type="submit" disabled={isPending} className={BTN_PRIMARY}>
          {isPending ? "Saving…" : <><Check className="size-3.5" />{item ? "Update" : "Add"}</>}
        </button>
      </div>
    </form>
  );
}

export default function SkillsManager({ initialItems }: { initialItems: Item[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<"list" | "add" | { edit: string }>("list");
  const [state, action, isPending] = useActionState<AR, FormData>(saveSkill, null);
  const [, startDelete] = useTransition();

  useEffect(() => {
    if (state?.success) { router.refresh(); setMode("list"); }
  }, [state, router]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this skill?")) return;
    startDelete(async () => {
      const fd = new FormData();
      fd.set("id", id);
      await deleteSkill(null, fd);
      router.refresh();
    });
  };

  const editItem = typeof mode === "object" ? initialItems.find(i => i.id === mode.edit) : undefined;

  return (
    <div className="flex flex-col gap-4">
      {mode === "list" && (
        <button onClick={() => setMode("add")} className={BTN_PRIMARY + " self-start"}><Plus className="size-3.5" />Add Skill</button>
      )}
      {mode === "add" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">New Skill</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <SkillForm key="new" action={action} isPending={isPending} state={state} />
        </>
      )}
      {typeof mode === "object" && editItem && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Edit Skill</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <SkillForm key={editItem.id} action={action} isPending={isPending} state={state} item={editItem} />
        </>
      )}
      {mode === "list" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {initialItems.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center col-span-2">No skills yet.</p>}
          {initialItems.map((item) => {
            const SvgIcon = !item.icon_url ? SKILL_ICONS[item.icon_key] : null;
            return (
              <div key={item.id} className="flex items-center justify-between gap-3 p-3 border border-border rounded-xl bg-card">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="size-8 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0">
                    {item.icon_url ? (
                      <img src={item.icon_url} alt="" className="size-5 object-contain" />
                    ) : SvgIcon ? (
                      <SvgIcon className="size-5" />
                    ) : (
                      <span className="text-xs text-muted-foreground">?</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setMode({ edit: item.id })} className={BTN_GHOST + " !p-1.5"}><Pencil className="size-3.5" /></button>
                  <button onClick={() => handleDelete(item.id)} className={BTN_GHOST + " !p-1.5 hover:!text-red-600 hover:!bg-red-500/10"}><Trash2 className="size-3.5" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
