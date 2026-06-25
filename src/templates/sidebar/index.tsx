/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/section/contact-form";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { Icons } from "@/components/icons";
import { GoogleFontLoader } from "@/components/google-font-loader";
import { ProjectsPaginated } from "@/components/section/projects-paginated";
import type { PortfolioData } from "@/templates/types";

// ── "Chiang" ─ Inspired by Brittany Chiang's brittanychiang.com ──
// The most-referenced developer portfolio: fixed dark left panel, scrollable right.

const NAV = [
  { label: "About",       href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Education",   href: "#education" },
  { label: "Skills",      href: "#skills" },
  { label: "Projects",    href: "#projects" },
  { label: "Hackathons",  href: "#hackathons" },
  { label: "Contact",     href: "#contact" },
];

function NumTag({ n }: { n: string }) {
  return <span className="font-mono text-sm mr-1" style={{ color: "var(--tc-accent)" }}>{n}.</span>;
}

export default function SidebarTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <div
        className="min-h-screen lg:flex pb-28 lg:pb-0"
        style={{
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >

      {/* ── Left fixed panel ── */}
      <aside className="bg-slate-900 text-slate-50 lg:sticky lg:top-0 lg:h-screen w-full lg:w-[340px] shrink-0 flex flex-col px-8 py-10 lg:py-14 lg:overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 lg:flex-col lg:items-start lg:gap-5">
          <Avatar className="size-16 lg:size-20 border-2 border-slate-700 ring-2 ring-slate-600 shadow-xl shrink-0">
            <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
            <AvatarFallback className="bg-slate-800 text-slate-300 text-xl">{hero.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{hero.displayName}</h1>
            <p className="text-slate-400 text-sm mt-1 lg:mt-2 max-w-[220px] leading-relaxed">{hero.description}</p>
          </div>
        </div>

        {/* Nav — desktop only, interactive width indicator */}
        <nav className="hidden lg:flex flex-col gap-1 flex-1">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 py-2 text-slate-400 hover:text-slate-50 transition-colors"
            >
              <span className="h-px w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-50 transition-all duration-200 ease-out" />
              <span className="text-xs font-semibold uppercase tracking-widest">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Social at bottom of left panel */}
        <div className="hidden lg:flex gap-4 mt-8 pt-8 border-t border-slate-800">
          <a href="https://github.com" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-50 transition-colors">
            <Icons.github className="size-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-slate-500 hover:text-slate-50 transition-colors">
            <Icons.linkedin className="size-5" />
          </a>
        </div>
      </aside>

      {/* ── Right scrollable content ── */}
      <main className="flex-1 px-6 py-12 lg:px-14 lg:py-20 max-w-2xl lg:max-w-3xl">

        {/* About */}
        <section id="about" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="01" /> About
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <div className="text-muted-foreground leading-relaxed prose max-w-full dark:prose-invert">
            <Markdown>{about}</Markdown>
          </div>
        </section>

        {/* Work */}
        <section id="experience" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="02" /> Experience
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <div className="flex flex-col gap-4">
            {work.map(w => (
              <div key={w.company} className="group flex gap-4 p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-md transition-all hover:border-primary/30">
                {w.logoUrl
                  ? <img src={w.logoUrl} alt={w.company} className="size-11 rounded-lg border object-contain p-1 bg-background shrink-0 mt-0.5" />
                  : <div className="size-11 rounded-lg border bg-muted shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">{w.company}</p>
                      <p className="text-sm text-muted-foreground">{w.title}</p>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">{w.start} — {w.end ?? "Present"}</span>
                  </div>
                  {w.description && <p className="text-sm text-muted-foreground mt-1">{w.description}</p>}
                  {w.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.badges.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="03" /> Education
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <div className="flex flex-col gap-4">
            {education.map(e => (
              <Link key={e.school} href={e.href} target="_blank" className="group flex gap-4 p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-md transition-all hover:border-primary/30">
                {e.logoUrl
                  ? <img src={e.logoUrl} alt={e.school} className="size-11 rounded-lg border object-contain p-1 bg-background shrink-0" />
                  : <div className="size-11 rounded-lg border bg-muted shrink-0" />}
                <div className="flex-1">
                  <p className="font-semibold group-hover:text-primary transition-colors">{e.school}</p>
                  <p className="text-sm text-muted-foreground">{e.degree}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.start} – {e.end}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="04" /> Skills
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => {
              const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
              return (
                <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm">
                  {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="size-5 object-contain" /> : Icon ? <Icon className="size-5" /> : null}
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="05" /> Projects
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <ProjectsPaginated className="flex flex-col gap-5">
            {projects.map(p => (
              <div key={p.title} className="group flex flex-col sm:flex-row gap-4 border border-border rounded-xl bg-card/50 overflow-hidden hover:shadow-lg transition-all hover:border-primary/30">
                {p.image && <img src={p.image} alt={p.title} className="w-full sm:w-40 h-40 sm:h-auto object-cover shrink-0" />}
                <div className="flex-1 p-5">
                  <p className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{p.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">{p.dates}</p>
                  <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.technologies.slice(0, 5).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                  <div className="flex gap-3">
                    {p.links.map((l, i) => (
                      <Link key={i} href={l.href} target="_blank" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                        {l.icon_type === "github" ? <Icons.github className="size-3.5" /> : <Icons.globe className="size-3.5" />}
                        {l.type}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ProjectsPaginated>
        </section>

        {/* Hackathons */}
        <section id="hackathons" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="06" /> Hackathons
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hackathons.map(h => (
              <div key={h.title} className="flex gap-3 p-4 border border-border rounded-xl bg-card/50 hover:border-primary/30 hover:shadow-sm transition-all">
                {h.image
                  ? <img src={h.image} alt={h.title} className="size-10 rounded-full border object-contain p-1 bg-muted shrink-0" />
                  : <div className="size-10 rounded-full border bg-muted shrink-0" />}
                <div>
                  <p className="font-semibold text-sm">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.dates} · {h.location}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <NumTag n="07" /> Contact
            <span className="flex-1 h-px bg-border ml-4" />
          </h2>
          <ContactForm />
        </section>
      </main>
    </div>
    </>
  );
}
