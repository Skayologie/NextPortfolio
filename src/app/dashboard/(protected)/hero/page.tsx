import { createAdminClient } from "@/lib/supabase-admin";
import HeroForm from "./hero-form";

async function getCurrentHero() {
  const { data } = await createAdminClient()
    .from("hero")
    .select("display_name, description, avatar_url")
    .single();
  return {
    displayName: data?.display_name ?? "Jawad",
    description: data?.description ?? "",
    avatarUrl: data?.avatar_url ?? "/web-app-manifest-512x512.png",
  };
}

export default async function HeroPage() {
  const hero = await getCurrentHero();
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Hero Section</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Edit your name, tagline, and avatar shown at the top of the portfolio.
      </p>
      <HeroForm initialHero={hero} />
    </div>
  );
}
