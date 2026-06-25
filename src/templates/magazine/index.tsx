/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/section/contact-form";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { Icons } from "@/components/icons";
import { GoogleFontLoader } from "@/components/google-font-loader";
import type { PortfolioData } from "@/templates/types";

const Divider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 my-12">
    <div className="flex-1 h-px bg-border" />
    <h2 className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: "var(--tc-accent)" }}>{label}</h2>
    <div className="flex-1 h-px bg-border" />
  </div>
);

export default function MagazineTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="max-w-3xl mx-auto px-6 py-16 pb-28"
        style={{
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >
      {/* Hero — editorial large */}
      <section className="text-center py-8 mb-4">
        <Avatar className="size-24 mx-auto mb-6 border-4 border-foreground ring-4 ring-background shadow-2xl">
          <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
          <AvatarFallback className="text-3xl">{hero.displayName[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none">{hero.displayName}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{hero.description}</p>
      </section>

      <Divider label="About" />
      <div className="prose prose-lg max-w-full dark:prose-invert text-muted-foreground [&>p]:text-balance [&>p]:leading-relaxed text-pretty">
        <Markdown>{about}</Markdown>
      </div>

      <Divider label="Experience" />
      <div className="flex flex-col gap-0">
        {work.map((w, i) => (
          <div key={w.company} className="flex gap-6 py-6 border-b border-border last:border-0">
            <span className="text-4xl font-black text-muted-foreground/20 tabular-nums leading-none shrink-0 w-12 text-right">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {w.logoUrl && <img src={w.logoUrl} alt={w.company} className="size-8 rounded object-contain border p-0.5" />}
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{w.company}</h3>
                    <p className="text-muted-foreground font-medium">{w.title}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">{w.start} — {w.end ?? "Present"}</span>
              </div>
              {w.description && <p className="mt-3 text-muted-foreground leading-relaxed">{w.description}</p>}
              {w.badges.length > 0 && <div className="flex flex-wrap gap-1 mt-3">{w.badges.map(b => <Badge key={b} variant="outline" className="uppercase text-xs tracking-wide">{b}</Badge>)}</div>}
            </div>
          </div>
        ))}
      </div>

      <Divider label="Education" />
      <div className="flex flex-col sm:flex-row gap-6">
        {education.map(e => (
          <Link key={e.school} href={e.href} target="_blank" className="flex-1 p-5 border-2 border-border rounded-2xl hover:border-foreground transition-colors group">
            {e.logoUrl && <img src={e.logoUrl} alt={e.school} className="size-10 rounded object-contain border mb-3 p-0.5" />}
            <h3 className="font-black text-lg uppercase tracking-tight group-hover:underline">{e.school}</h3>
            <p className="text-muted-foreground">{e.degree}</p>
            <p className="text-sm text-muted-foreground mt-1">{e.start} – {e.end}</p>
          </Link>
        ))}
      </div>

      <Divider label="Skills" />
      <div className="flex flex-wrap gap-2">
        {skills.map(s => { const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null; return (
          <div key={s.id} className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-border hover:border-foreground transition-colors text-sm font-semibold">
            {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="size-5 object-contain" /> : Icon ? <Icon className="size-5" /> : null}
            {s.name}
          </div>
        ); })}
      </div>

      <Divider label="Projects" />
      <div className="flex flex-col gap-6">
        {projects.map(p => (
          <div key={p.title} className="flex flex-col sm:flex-row gap-4 p-5 border-2 border-border rounded-2xl hover:border-foreground transition-colors">
            {p.image && <img src={p.image} alt={p.title} className="w-full sm:w-40 h-32 sm:h-auto object-cover rounded-xl shrink-0" />}
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase tracking-tight">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">{p.dates}</p>
              <p className="text-muted-foreground">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">{p.technologies.slice(0, 5).map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
              <div className="flex gap-4 mt-3">{p.links.map((l, i) => <Link key={i} href={l.href} target="_blank" className="flex items-center gap-1.5 text-sm font-semibold hover:underline">{l.icon_type === "github" ? <Icons.github className="size-4" /> : <Icons.globe className="size-4" />}{l.type}</Link>)}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider label="Hackathons" />
      <div className="grid sm:grid-cols-2 gap-4">
        {hackathons.map(h => (
          <div key={h.title} className="p-5 border-2 border-border rounded-2xl hover:border-foreground transition-colors">
            <div className="flex items-center gap-3 mb-3">
              {h.image && <img src={h.image} alt={h.title} className="size-10 rounded-full border object-contain p-1" />}
              <div><h3 className="font-black uppercase tracking-tight">{h.title}</h3><p className="text-xs text-muted-foreground">{h.dates} · {h.location}</p></div>
            </div>
            <p className="text-sm text-muted-foreground">{h.description}</p>
          </div>
        ))}
      </div>

      <Divider label="Contact" />
      <ContactForm />
    </main>
    </>
  );
}
