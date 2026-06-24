import { createAdminClient } from "@/lib/supabase-admin";
import WorkManager from "./manager";

async function getWork() {
  const { data } = await createAdminClient()
    .from("work_experience")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function WorkPage() {
  const items = await getWork();
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Work Experience</h1>
      <p className="text-sm text-muted-foreground mb-6">Add, edit, or remove work experience entries.</p>
      <WorkManager initialItems={items} />
    </div>
  );
}
