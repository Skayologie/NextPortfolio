import { createAdminClient } from "@/lib/supabase-admin";
import AboutForm from "./about-form";

async function getCurrentAbout(): Promise<string> {
  const { data } = await createAdminClient().from("about").select("content").eq("id", 1).single();
  return data?.content ?? "";
}

export default async function AboutPage() {
  const content = await getCurrentAbout();
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">About Section</h1>
      <p className="text-sm text-muted-foreground mb-6">Edit the summary text shown on your portfolio.</p>
      <AboutForm initialContent={content} />
    </div>
  );
}
