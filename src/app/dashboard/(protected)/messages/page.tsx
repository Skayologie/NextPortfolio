import { createAdminClient } from "@/lib/supabase-admin";
import MessagesManager from "./manager";

async function getMessages() {
  const { data } = await createAdminClient()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function MessagesPage() {
  const items = await getMessages();
  const unread = items.filter((m) => !m.is_read).length;
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
        {unread > 0 && (
          <span className="text-xs bg-foreground text-background rounded-full px-2 py-0.5 font-medium">{unread} new</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-6">Contact form submissions from your portfolio.</p>
      <MessagesManager initialItems={items} />
    </div>
  );
}
