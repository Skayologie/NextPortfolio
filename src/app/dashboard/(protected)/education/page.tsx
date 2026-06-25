import { createAdminClient } from "@/lib/supabase-admin";
import EducationManager from "./manager";

async function getEducation() {
  const { data } = await createAdminClient()
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function EducationPage() {
  const items = await getEducation();
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Education</h1>
      <p className="text-sm text-muted-foreground mb-6">Add, edit, or remove education entries.</p>
      <EducationManager initialItems={items} />
    </div>
  );
}
