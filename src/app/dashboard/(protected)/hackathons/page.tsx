import { createAdminClient } from "@/lib/supabase-admin";
import HackathonsManager from "./manager";

async function getHackathons() {
  const { data } = await createAdminClient()
    .from("hackathons")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function HackathonsPage() {
  const items = await getHackathons();
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Hackathons</h1>
      <p className="text-sm text-muted-foreground mb-6">Add, edit, or remove hackathon entries.</p>
      <HackathonsManager initialItems={items} />
    </div>
  );
}
