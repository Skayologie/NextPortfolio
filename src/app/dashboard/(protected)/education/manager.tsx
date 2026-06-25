"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { saveEducation, deleteEducation, type AR } from "@/app/actions/dashboard";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN = "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50";
const BTN_PRIMARY = `${BTN} bg-foreground text-background hover:opacity-90`;
const BTN_GHOST = `${BTN} border border-border text-muted-foreground hover:text-foreground hover:bg-muted`;

type Item = Record<string, unknown>;

function EduForm({ action, isPending, state, item }: { action: (fd: FormData) => void; isPending: boolean; state: AR; item?: Item }) {
  const [logoUrl, setLogoUrl] = useState((item?.logo_url as string) ?? "");

  return (
    <form action={action} className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-card">
      {item && <input type="hidden" name="id" value={item.id as string} />}
      {state?.error && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">School *</label>
          <input name="school" required disabled={isPending} defaultValue={item?.school as string} className={INPUT} placeholder="MIT" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Degree *</label>
          <input name="degree" required disabled={isPending} defaultValue={item?.degree as string} className={INPUT} placeholder="B.Sc. Computer Science" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Website URL</label>
          <input name="href" disabled={isPending} defaultValue={item?.href as string} className={INPUT} placeholder="https://mit.edu" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Start Year *</label>
          <input name="start_year" required disabled={isPending} defaultValue={item?.start_year as string} className={INPUT} placeholder="2020" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">End Year *</label>
          <input name="end_year" required disabled={isPending} defaultValue={item?.end_year as string} className={INPUT} placeholder="2024" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Sort Order</label>
          <input name="sort_order" type="number" disabled={isPending} defaultValue={(item?.sort_order as number) ?? 0} className={INPUT} />
        </div>
      </div>

      {/* Logo with upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">School Logo</label>
        <div className="flex items-center gap-3">
          {logoUrl && (
            <img src={logoUrl} alt="logo" className="size-10 rounded-full border border-border object-contain bg-muted p-1 shrink-0" onError={() => setLogoUrl("")} />
          )}
          <div className="flex-1 flex flex-col gap-1.5">
            <input name="logo_url" disabled={isPending} value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={INPUT} placeholder="https://…/logo.png" />
            <ImageUpload label="Upload logo" onUpload={(url) => setLogoUrl(url)} />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className={BTN_PRIMARY}>{isPending ? "Saving…" : <><Check className="size-3.5" />{item ? "Update" : "Add"}</>}</button>
      </div>
    </form>
  );
}

export default function EducationManager({ initialItems }: { initialItems: Item[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<"list" | "add" | { edit: string }>("list");
  const [state, action, isPending] = useActionState<AR, FormData>(saveEducation, null);
  const [, startDelete] = useTransition();

  useEffect(() => {
    if (state?.success) { router.refresh(); setMode("list"); }
  }, [state, router]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this entry?")) return;
    startDelete(async () => {
      const fd = new FormData();
      fd.set("id", id);
      await deleteEducation(null, fd);
      router.refresh();
    });
  };

  const editItem = typeof mode === "object" ? initialItems.find(i => i.id === mode.edit) : undefined;

  return (
    <div className="flex flex-col gap-4">
      {mode === "list" && (
        <button onClick={() => setMode("add")} className={BTN_PRIMARY + " self-start"}><Plus className="size-3.5" />Add Entry</button>
      )}
      {mode === "add" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">New Entry</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <EduForm key="new" action={action} isPending={isPending} state={state} />
        </>
      )}
      {typeof mode === "object" && editItem && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Edit Entry</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <EduForm key={editItem.id as string} action={action} isPending={isPending} state={state} item={editItem} />
        </>
      )}
      {mode === "list" && (
        <div className="flex flex-col gap-2">
          {initialItems.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No entries yet.</p>}
          {initialItems.map((item) => (
            <div key={item.id as string} className="flex items-center justify-between gap-3 p-3 border border-border rounded-xl bg-card">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {Boolean(item.logo_url) && <img src={item.logo_url as string} alt="" className="size-8 rounded-full border border-border object-contain bg-muted p-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.school as string}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.degree as string} · {item.start_year as string} – {item.end_year as string}</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => setMode({ edit: item.id as string })} className={BTN_GHOST + " !p-1.5"}><Pencil className="size-3.5" /></button>
                <button onClick={() => handleDelete(item.id as string)} className={BTN_GHOST + " !p-1.5 hover:!text-red-600 hover:!bg-red-500/10"}><Trash2 className="size-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
