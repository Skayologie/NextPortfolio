import { createAdminClient } from "@/lib/supabase-admin";
import ThemeForm from "./theme-form";

async function getCurrent() {
  const { data } = await createAdminClient()
    .from("settings")
    .select("key, value")
    .in("key", ["portfolio_theme", "portfolio_font_family"]);
  const map = Object.fromEntries((data ?? []).map(r => [r.key, r.value]));
  return {
    themeKey: (map["portfolio_theme"] ?? "zinc") as string,
    fontFamily: (map["portfolio_font_family"] ?? "") as string,
  };
}

export default async function ThemePage() {
  const current = await getCurrent();
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Style</h1>
      <p className="text-sm text-muted-foreground mb-6">Change the color theme and font of your portfolio.</p>
      <ThemeForm current={current} />
    </div>
  );
}
