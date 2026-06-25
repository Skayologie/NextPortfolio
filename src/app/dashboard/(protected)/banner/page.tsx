import { createAdminClient } from "@/lib/supabase-admin";
import BannerForm from "./banner-form";
import type { BannerData } from "@/lib/portfolio-data";

async function getCurrentBanner(): Promise<BannerData> {
  const { data } = await createAdminClient()
    .from("banner")
    .select("message, style, link_text, link_url, is_active")
    .eq("id", 1)
    .single();
  if (!data) return { message: "", style: "info", linkText: "", linkUrl: "", isActive: false };
  return {
    message: data.message,
    style: (data.style as BannerData["style"]) ?? "info",
    linkText: data.link_text,
    linkUrl: data.link_url,
    isActive: data.is_active,
  };
}

export default async function BannerPage() {
  const current = await getCurrentBanner();
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">Announcement Banner</h1>
      <p className="text-sm text-muted-foreground mb-6">Show a dismissible banner at the top of your portfolio.</p>
      <BannerForm current={current} />
    </div>
  );
}
