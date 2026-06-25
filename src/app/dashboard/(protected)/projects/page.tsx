import { createAdminClient } from "@/lib/supabase-admin";
import ProjectsManager from "./manager";

async function getProjects() {
  const { data } = await createAdminClient()
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export default async function ProjectsPage() {
  const items = await getProjects();
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Projects</h1>
      <p className="text-sm text-muted-foreground mb-6">Add, edit, or remove portfolio projects.</p>
      <ProjectsManager initialItems={items} />
    </div>
  );
}
