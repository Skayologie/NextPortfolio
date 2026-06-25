import { createAdminClient } from "@/lib/supabase-admin";
import SkillsManager from "./manager";

async function getSkills() {
  const { data } = await createAdminClient()
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function SkillsPage() {
  const items = await getSkills();
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Skills</h1>
      <p className="text-sm text-muted-foreground mb-6">Add, edit, or remove skills shown on your portfolio.</p>
      <SkillsManager initialItems={items} />
    </div>
  );
}
