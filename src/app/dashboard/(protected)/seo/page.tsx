import { getSeoSettings } from "@/lib/portfolio-data";
import SeoForm from "./seo-form";

export default async function SeoPage() {
  const seo = await getSeoSettings();
  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold mb-1 text-foreground">SEO Settings</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Control how your portfolio appears in Google search results and on social media.
      </p>
      <SeoForm initialSeo={seo} />
    </div>
  );
}
