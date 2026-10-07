import Navbar from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import AnnouncementBanner from "@/components/announcement-banner";
import PageTracker from "@/components/page-tracker";
import { getBanner, getActiveTemplate } from "@/lib/portfolio-data";

const HIDE_FLICKER = new Set(["terminal", "creative", "buddy"]);

export default async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [banner, activeTemplate] = await Promise.all([getBanner(), getActiveTemplate()]);
  const showFlicker = !HIDE_FLICKER.has(activeTemplate);

  return (
    <TooltipProvider delayDuration={0}>
      <PageTracker />
      <AnnouncementBanner banner={banner} />
      {showFlicker && (
        <div className="absolute inset-x-0 top-0 h-[100px] overflow-hidden z-0 pointer-events-none">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      <Navbar template={activeTemplate} />
    </TooltipProvider>
  );
}
