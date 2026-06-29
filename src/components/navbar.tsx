import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

type StyleDef = { dock: string; icon: string; sep: string };

const TEMPLATE_STYLES: Record<string, StyleDef> = {
  minimal: {
    dock: "bg-card/90 backdrop-blur-3xl border shadow-[0_0_10px_3px] shadow-primary/5",
    icon: "bg-background text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border",
    sep:  "bg-border",
  },
  terminal: {
    dock: "bg-zinc-900/95 border-zinc-700/80 shadow-2xl shadow-black/60",
    icon: "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700",
    sep:  "bg-zinc-700",
  },
  bento: {
    dock: "bg-card/90 backdrop-blur-xl border shadow-[0_0_12px_4px] shadow-primary/8",
    icon: "bg-background text-muted-foreground hover:text-primary hover:bg-primary/10 backdrop-blur-xl border border-border",
    sep:  "bg-border",
  },
  magazine: {
    dock: "bg-foreground/[0.97] border-foreground/20 shadow-2xl shadow-foreground/10",
    icon: "bg-foreground/80 text-background hover:bg-foreground hover:text-background border border-background/10",
    sep:  "bg-background/20",
  },
  sidebar: {
    dock: "bg-slate-800/95 border-slate-600/70 shadow-2xl shadow-black/50",
    icon: "bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 border border-slate-600",
    sep:  "bg-slate-600",
  },
  glass: {
    dock: "bg-slate-900/90 border-teal-800/50 shadow-[0_0_30px_6px] shadow-teal-900/30",
    icon: "bg-slate-800 text-slate-400 hover:text-teal-300 hover:bg-teal-950 border border-white/10",
    sep:  "bg-teal-800/60",
  },
  creative: {
    dock: "bg-indigo-950/90 border-indigo-700/60 shadow-[0_0_30px_8px] shadow-indigo-900/40",
    icon: "bg-indigo-900/60 text-slate-400 hover:text-white hover:bg-indigo-700 border border-indigo-700/60",
    sep:  "bg-indigo-700/60",
  },
  buddy: {
    dock: "bg-slate-900/90 border-teal-800/50 shadow-[0_0_30px_8px] shadow-teal-900/30",
    icon: "bg-slate-800 text-slate-400 hover:text-teal-300 hover:bg-teal-950 border border-white/10",
    sep:  "bg-teal-800/50",
  },
};

export default function Navbar({ template = "minimal" }: { template?: string }) {
  const style: StyleDef = TEMPLATE_STYLES[template] ?? TEMPLATE_STYLES.minimal;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className={cn("z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2", style.dock)}>
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                >
                  <DockIcon className={cn("rounded-3xl cursor-pointer size-full p-0 transition-colors", style.icon)}>
                    <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Separator orientation="vertical" className={cn("h-2/3 m-auto w-px", style.sep)} />

        {Object.entries(DATA.contact.social)
          .filter(([_, s]) => s.navbar)
          .map(([name, social], index) => {
            const isExternal = social.url.startsWith("http");
            const IconComponent = social.icon;
            return (
              <Tooltip key={`social-${name}-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${name} profile`}
                  >
                    <DockIcon className={cn("rounded-3xl cursor-pointer size-full p-0 transition-colors", style.icon)}>
                      <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                  <p>{name}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            );
          })}

        <Separator orientation="vertical" className={cn("h-2/3 m-auto w-px", style.sep)} />

        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className={cn("rounded-3xl cursor-pointer size-full p-0 transition-colors", style.icon)}>
              <ModeToggle className="size-full cursor-pointer" />
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8} className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <p>Theme</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
