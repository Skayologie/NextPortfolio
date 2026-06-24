"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { saveProject, deleteProject, type AR } from "@/app/actions/dashboard";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors";
const BTN = "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50";
const BTN_PRIMARY = `${BTN} bg-foreground text-background hover:opacity-90`;
const BTN_GHOST = `${BTN} border border-border text-muted-foreground hover:text-foreground hover:bg-muted`;

type Item = Record<string, unknown>;

function ProjectForm({ action, isPending, state, item }: { action: (fd: FormData) => void; isPending: boolean; state: AR; item?: Item }) {
  const [imageUrl, setImageUrl] = useState((item?.image as string) ?? "");

  return (
    <form action={action} className="flex flex-col gap-4 p-4 border border-border rounded-xl bg-card">
      {item && <input type="hidden" name="id" value={item.id as string} />}
      {state?.error && <p className="text-sm text-red-600 bg-red-500/10 rounded-lg px-3 py-2">{state.error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Title *</label>
          <input name="title" required disabled={isPending} defaultValue={item?.title as string} className={INPUT} placeholder="My Project" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Dates</label>
          <input name="dates" disabled={isPending} defaultValue={item?.dates as string} className={INPUT} placeholder="Jan 2024 – Mar 2024" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Website URL</label>
          <input name="href" disabled={isPending} defaultValue={item?.href as string} className={INPUT} placeholder="https://…" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Video URL</label>
          <input name="video" disabled={isPending} defaultValue={item?.video as string} className={INPUT} placeholder="https://…/demo.mp4" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Sort Order</label>
          <input name="sort_order" type="number" disabled={isPending} defaultValue={(item?.sort_order as number) ?? 0} className={INPUT} />
        </div>
      </div>

      {/* Image with upload */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">Preview Image</label>
        <div className="flex items-start gap-3">
          {imageUrl && (
            <img src={imageUrl} alt="preview" className="size-16 rounded-lg border border-border object-cover bg-muted shrink-0" onError={() => setImageUrl("")} />
          )}
          <div className="flex-1 flex flex-col gap-1.5">
            <input name="image" disabled={isPending} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={INPUT} placeholder="https://…/preview.png" />
            <ImageUpload label="Upload image" onUpload={(url) => setImageUrl(url)} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Description</label>
        <textarea name="description" rows={3} disabled={isPending} defaultValue={item?.description as string} className={INPUT + " resize-y"} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Technologies (comma-separated)</label>
        <input name="technologies" disabled={isPending} defaultValue={(item?.technologies as string[])?.join(", ") ?? ""} className={INPUT} placeholder="React, TypeScript, Supabase" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">
          Links (JSON) — each: <code className="text-xs bg-muted px-1 rounded">{"{"}"type","href","icon_type":"github|globe"{"}"}</code>
        </label>
        <textarea name="links" rows={3} disabled={isPending} defaultValue={JSON.stringify(item?.links ?? [], null, 2)} className={INPUT + " resize-y font-mono text-xs"} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_active" name="is_active" value="true" disabled={isPending} defaultChecked={!!item?.is_active} className="size-4 rounded border-border" />
        <label htmlFor="is_active" className="text-sm text-foreground">Active (featured on portfolio)</label>
      </div>
      <div>
        <button type="submit" disabled={isPending} className={BTN_PRIMARY}>{isPending ? "Saving…" : <><Check className="size-3.5" />{item ? "Update" : "Add"}</>}</button>
      </div>
    </form>
  );
}

export default function ProjectsManager({ initialItems }: { initialItems: Item[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<"list" | "add" | { edit: string }>("list");
  const [state, action, isPending] = useActionState<AR, FormData>(saveProject, null);
  const [, startDelete] = useTransition();

  useEffect(() => {
    if (state?.success) { router.refresh(); setMode("list"); }
  }, [state, router]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project?")) return;
    startDelete(async () => {
      const fd = new FormData();
      fd.set("id", id);
      await deleteProject(null, fd);
      router.refresh();
    });
  };

  const editItem = typeof mode === "object" ? initialItems.find(i => i.id === mode.edit) : undefined;

  return (
    <div className="flex flex-col gap-4">
      {mode === "list" && (
        <button onClick={() => setMode("add")} className={BTN_PRIMARY + " self-start"}><Plus className="size-3.5" />Add Project</button>
      )}
      {mode === "add" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">New Project</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <ProjectForm key="new" action={action} isPending={isPending} state={state} />
        </>
      )}
      {typeof mode === "object" && editItem && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Edit Project</h2>
            <button onClick={() => setMode("list")} className={BTN_GHOST}><X className="size-3.5" />Cancel</button>
          </div>
          <ProjectForm key={editItem.id as string} action={action} isPending={isPending} state={state} item={editItem} />
        </>
      )}
      {mode === "list" && (
        <div className="flex flex-col gap-2">
          {initialItems.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No projects yet.</p>}
          {initialItems.map((item) => (
            <div key={item.id as string} className="flex items-center justify-between gap-3 p-3 border border-border rounded-xl bg-card">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {Boolean(item.image) && <img src={item.image as string} alt="" className="size-10 rounded-lg border border-border object-cover bg-muted shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{item.title as string}</p>
                    {Boolean(item.is_active) && <span className="text-xs bg-green-500/15 text-green-700 rounded px-1.5 py-0.5 shrink-0">active</span>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.dates as string}</p>
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
