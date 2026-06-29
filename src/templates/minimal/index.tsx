/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/section/contact-form";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { Icons } from "@/components/icons";
import { GoogleFontLoader } from "@/components/google-font-loader";
import { ProjectsPaginated } from "@/components/section/projects-paginated";
import type { PortfolioData } from "@/templates/types";

const D = 0.04;

export default function MinimalTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="max-w-2xl mx-auto px-6 py-12 pb-28 sm:py-24 flex flex-col gap-14"
        style={{
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >
      {/* Hero */}
      <section>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-2 order-2 md:order-1">
            <BlurFadeText as="h1" delay={D} className="text-3xl font-semibold tracking-tighter sm:text-5xl" yOffset={8} text={`Hi, I'm ${hero.displayName}`} />
            <BlurFadeText delay={D} className="text-muted-foreground max-w-[600px] md:text-lg" text={hero.description} />
          </div>
          <BlurFade delay={D} className="order-1 md:order-2">
            <Avatar className="size-24 md:size-32 border ring-4 ring-muted shadow-lg">
              <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
              <AvatarFallback>{hero.displayName[0]}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </section>

      {/* About */}
      <BlurFade delay={D * 3}>
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">About</h2>
          <div className="prose max-w-full text-muted-foreground dark:prose-invert text-pretty leading-relaxed"><Markdown>{about}</Markdown></div>
        </section>
      </BlurFade>

      {/* Work */}
      <BlurFade delay={D * 5}>
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <div className="flex flex-col gap-6">
            {work.map(w => (
              <div key={w.company} className="flex gap-4">
                {w.logoUrl ? <img src={w.logoUrl} alt={w.company} className="size-10 rounded-full border object-contain p-1 ring-2 ring-border shrink-0 mt-1" /> : <div className="size-10 rounded-full border ring-2 ring-border bg-muted shrink-0 mt-1" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{w.company}</h3>
                      <p className="text-sm text-muted-foreground">{w.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground shrink-0 tabular-nums">{w.start} – {w.end ?? "Present"}</p>
                  </div>
                  {w.description && <p className="text-sm text-muted-foreground mt-1">{w.description}</p>}
                  {w.badges.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{w.badges.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      {/* Education */}
      <BlurFade delay={D * 7}>
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Education</h2>
          <div className="flex flex-col gap-4">
            {education.map(e => (
              <Link key={e.school} href={e.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                {e.logoUrl ? <img src={e.logoUrl} alt={e.school} className="size-10 rounded-full border object-contain p-1 ring-2 ring-border shrink-0" /> : <div className="size-10 rounded-full border ring-2 ring-border bg-muted shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:underline">{e.school}</h3>
                  <p className="text-sm text-muted-foreground">{e.degree}</p>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums shrink-0">{e.start} – {e.end}</p>
              </Link>
            ))}
          </div>
        </section>
      </BlurFade>

      {/* Skills */}
      <BlurFade delay={D * 9}>
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => { const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null; return (
              <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card shadow-sm">
                {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="size-5 object-contain shrink-0" /> : Icon ? <Icon className="size-5 shrink-0" /> : null}
                <span className="text-sm font-medium">{s.name}</span>
              </div>
            ); })}
          </div>
        </section>
      </BlurFade>

      {/* Projects */}
      <BlurFade delay={D * 11}>
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Projects</h2>
          <ProjectsPaginated className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.title} className="border border-border rounded-xl overflow-hidden bg-card flex flex-col">
                {p.image && <img src={p.image} alt={p.title} className="w-full h-36 object-cover" />}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.dates}</p>
                  <p className="text-sm text-muted-foreground flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1">{p.technologies.slice(0, 4).map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div>
                  <div className="flex gap-2">{p.links.map((l, i) => <Link key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">{l.icon_type === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />}{l.type}</Link>)}</div>
                </div>
              </div>
            ))}
          </ProjectsPaginated>
        </section>
      </BlurFade>

      {/* Hackathons */}
      <BlurFade delay={D * 13}>
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Hackathons</h2>
          <div className="flex flex-col gap-4">
            {hackathons.map(h => (
              <div key={h.title} className="flex gap-4 items-start">
                {h.image ? <img src={h.image} alt={h.title} className="size-10 rounded-full border object-contain p-1 ring-2 ring-border shrink-0 mt-1" /> : <div className="size-10 rounded-full border ring-2 ring-border bg-muted shrink-0 mt-1" />}
                <div className="flex-1">
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="text-xs text-muted-foreground">{h.dates} · {h.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </BlurFade>

      {/* Contact */}
      <BlurFade delay={D * 15}>
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Contact</h2>
          <ContactForm />
        </section>
      </BlurFade>
    </main>
    </>
  );
}
