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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest mb-8 flex items-center gap-3" style={{ color: "var(--tc-accent)" }}>
      <span className="h-px flex-1 bg-border" />
      {children}
      <span className="h-px flex-1 bg-border" />
    </h2>
  );
}

export default function BentoTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="max-w-2xl mx-auto px-6 py-16 pb-28 sm:py-20 flex flex-col gap-16"
        style={{
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >

      {/* Hero */}
      <header className="flex flex-col items-center text-center gap-5 pt-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-transparent blur-xl scale-110" />
          <Avatar className="size-24 relative border-2 border-primary/20 shadow-xl">
            <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
            <AvatarFallback className="text-2xl">{hero.displayName[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{hero.displayName}</h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-md mx-auto">{hero.description}</p>
        </div>
      </header>

      {/* About */}
      <section>
        <SectionTitle>About</SectionTitle>
        <div className="prose max-w-full dark:prose-invert text-muted-foreground leading-relaxed">
          <Markdown>{about}</Markdown>
        </div>
      </section>

      {/* Work — vertical timeline */}
      <section>
        <SectionTitle>Work Experience</SectionTitle>
        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          {work.map((w, i) => (
            <div key={w.company} className="flex gap-5 pb-10 last:pb-0">
              <div className="relative z-10 mt-1 shrink-0">
                {w.logoUrl
                  ? <img src={w.logoUrl} alt={w.company} className="size-10 rounded-full border-2 border-background ring-2 ring-border object-contain p-0.5 bg-card shadow-sm" />
                  : <div className={`size-10 rounded-full border-2 border-background ring-2 ring-border bg-primary/10 flex items-center justify-center shadow-sm`}>
                      <span className="text-xs font-bold text-primary">{String(i + 1)}</span>
                    </div>}
              </div>
              <div className="flex-1 pt-1.5">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div>
                    <p className="font-semibold text-base">{w.company}</p>
                    <p className="text-sm text-muted-foreground">{w.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums bg-muted px-2 py-0.5 rounded-full">{w.start} – {w.end ?? "Now"}</span>
                </div>
                {w.description && <p className="text-sm text-muted-foreground mt-2">{w.description}</p>}
                {w.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {w.badges.map(b => <Badge key={b} variant="outline" className="text-xs">{b}</Badge>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education — timeline style */}
      <section>
        <SectionTitle>Education</SectionTitle>
        <div className="relative flex flex-col gap-0">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
          {education.map(e => (
            <div key={e.school} className="flex gap-5 pb-8 last:pb-0">
              <div className="relative z-10 mt-1 shrink-0">
                {e.logoUrl
                  ? <img src={e.logoUrl} alt={e.school} className="size-10 rounded-full border-2 border-background ring-2 ring-border object-contain p-0.5 bg-card shadow-sm" />
                  : <div className="size-10 rounded-full border-2 border-background ring-2 ring-border bg-muted shadow-sm" />}
              </div>
              <div className="flex-1 pt-1.5">
                <Link href={e.href} target="_blank" className="font-semibold hover:underline">{e.school}</Link>
                <p className="text-sm text-muted-foreground">{e.degree}</p>
                <span className="text-xs text-muted-foreground tabular-nums">{e.start} – {e.end}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => {
            const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
            return (
              <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card hover:bg-muted transition-colors shadow-sm">
                {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="size-5 object-contain" /> : Icon ? <Icon className="size-5" /> : null}
                <span className="text-sm font-medium">{s.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionTitle>Projects</SectionTitle>
        <ProjectsPaginated className="flex flex-col gap-4">
          {projects.map(p => (
            <div key={p.title} className="flex flex-col sm:flex-row gap-4 border border-border rounded-2xl bg-card overflow-hidden hover:shadow-md transition-shadow">
              {p.image && <img src={p.image} alt={p.title} className="w-full sm:w-36 h-40 sm:h-auto object-cover shrink-0" />}
              <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                    <p className="font-semibold text-base">{p.title}</p>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{p.dates}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.technologies.slice(0, 5).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                  <div className="flex gap-3">
                    {p.links.map((l, i) => (
                      <Link key={i} href={l.href} target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        {l.icon_type === "github" ? <Icons.github className="size-4" /> : <Icons.globe className="size-4" />}
                        {l.type}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ProjectsPaginated>
      </section>

      {/* Hackathons */}
      <section>
        <SectionTitle>Hackathons</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {hackathons.map(h => (
            <div key={h.title} className="flex gap-4 p-4 border border-border rounded-2xl bg-card hover:shadow-sm transition-shadow">
              {h.image
                ? <img src={h.image} alt={h.title} className="size-12 rounded-full border object-contain p-1 bg-muted shrink-0" />
                : <div className="size-12 rounded-full border bg-muted shrink-0" />}
              <div>
                <p className="font-semibold">{h.title}</p>
                <p className="text-xs text-muted-foreground">{h.dates} · {h.location}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactForm />
      </section>
    </main>
    </>
  );
}
