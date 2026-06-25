import { createAdminClient } from "@/lib/supabase-admin";
import { getTemplateCustomization } from "@/lib/portfolio-data";
import { TEMPLATES } from "@/templates/types";
import type { TemplateCustomization } from "@/templates/types";
import TemplatesForm from "./templates-form";

async function getPageData(): Promise<{ current: string; customizations: Record<string, TemplateCustomization> }> {
  try {
    const { data } = await createAdminClient().from("settings").select("value").eq("key", "portfolio_template").single();
    const current = data?.value ?? "minimal";
    const all = await Promise.all(TEMPLATES.map(t => getTemplateCustomization(t.key)));
    const customizations = Object.fromEntries(TEMPLATES.map((t, i) => [t.key, all[i]]));
    return { current, customizations };
  } catch {
    return { current: "minimal", customizations: {} };
  }
}

export default async function TemplatesPage() {
  const { current, customizations } = await getPageData();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Portfolio Templates</h1>
        <p className="text-muted-foreground mt-1">Choose a design for your portfolio. Click any card to switch instantly.</p>
      </div>
      <TemplatesForm current={current} customizations={customizations} />
    </div>
  );
}
