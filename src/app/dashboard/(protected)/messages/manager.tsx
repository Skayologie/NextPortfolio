"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { markRead, deleteMessage } from "@/app/actions/dashboard";
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp, Globe } from "lucide-react";

const BTN = "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 border border-border";
const BTN_GHOST = `${BTN} text-muted-foreground hover:text-foreground hover:bg-muted`;

type Item = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ip_address: string | null;
};

export default function MessagesManager({ initialItems }: { initialItems: Item[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", id);
      await markRead(null, fd);
      router.refresh();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this message?")) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", id);
      await deleteMessage(null, fd);
      router.refresh();
    });
  };

  if (initialItems.length === 0) {
    return <p className="text-sm text-muted-foreground py-12 text-center">No messages yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {initialItems.map((msg) => (
        <div
          key={msg.id}
          className={`border border-border rounded-xl bg-card overflow-hidden transition-colors ${!msg.is_read ? "border-foreground/20 bg-foreground/[0.02]" : ""}`}
        >
          <div className="flex items-start gap-3 p-3">
            <div className="mt-0.5 shrink-0">
              {msg.is_read ? (
                <MailOpen className="size-4 text-muted-foreground" />
              ) : (
                <Mail className="size-4 text-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-medium ${!msg.is_read ? "text-foreground" : "text-muted-foreground"}`}>
                  {msg.full_name}
                </span>
                <span className="text-xs text-muted-foreground">{msg.email}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{msg.message}</p>
            </div>
            <button
              onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              {expanded === msg.id ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </button>
          </div>
          {expanded === msg.id && (
            <div className="px-4 pb-4 border-t border-border mt-0 pt-3 flex flex-col gap-3">
              <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
              {msg.ip_address && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe className="size-3 shrink-0" />
                  <span className="font-mono">{msg.ip_address}</span>
                </div>
              )}
              <div className="flex gap-2">
                {!msg.is_read && (
                  <button onClick={() => handleMarkRead(msg.id)} className={BTN_GHOST}>
                    <MailOpen className="size-3" />Mark read
                  </button>
                )}
                <a href={`mailto:${msg.email}`} className={BTN_GHOST}>
                  <Mail className="size-3" />Reply
                </a>
                <button onClick={() => handleDelete(msg.id)} className={BTN_GHOST + " hover:!text-red-600 hover:!bg-red-500/10 hover:!border-red-500/20"}>
                  <Trash2 className="size-3" />Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
