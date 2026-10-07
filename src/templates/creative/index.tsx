import { projectSummary, projectPath } from "@/lib/projects";
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3" style={{ color: "var(--tc-accent)" }}>
      <span className="h-px flex-1 opacity-30" style={{ background: "var(--tc-accent)" }} />
      {children}
      <span className="h-px flex-1 opacity-30" style={{ background: "var(--tc-accent)" }} />
    </h2>
  );
}

export default function CreativeTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="min-h-screen pb-28"
        style={{
          background: customization.bgColor || "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 30%, #0d1117 60%, #0a0a1a 100%)",
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative max-w-2xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16">

        {/* Hero */}
        <header className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl scale-150" />
            <Avatar className="size-24 relative border border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
              <AvatarFallback className="bg-indigo-950 text-indigo-200 text-2xl">{hero.displayName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <p className="text-indigo-400 text-xs uppercase tracking-widest font-semibold mb-3">Software Developer</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">{hero.displayName}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">{hero.description}</p>
          </div>
        </header>

        {/* About */}
        <section>
          <SectionLabel>About</SectionLabel>
          <div className="text-slate-400 leading-relaxed"><Markdown>{about}</Markdown></div>
        </section>

        {/* Work */}
        <section>
          <SectionLabel>Experience</SectionLabel>
          <div className="flex flex-col gap-3">
            {work.map(w => (
              <div key={w.company} className="group flex gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all">
                {w.logoUrl
                  ? <img loading="lazy" decoding="async" src={w.logoUrl} alt={w.company} className="size-10 rounded-lg border border-white/10 object-contain p-1 bg-white/5 shrink-0 mt-0.5" />
                  : <div className="size-10 rounded-lg border border-white/10 bg-indigo-950 shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <p className="font-semibold text-white">{w.company}</p>
                      <p className="text-sm text-slate-400">{w.title}</p>
                    </div>
                    <span className="text-xs text-slate-600 tabular-nums">{w.start} – {w.end ?? "Now"}</span>
                  </div>
                  {w.description && <p className="text-sm text-slate-400 mt-1">{w.description}</p>}
                  {w.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.badges.map(b => <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-800/60">{b}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionLabel>Education</SectionLabel>
          <div className="flex flex-col sm:flex-row gap-3">
            {education.map(e => (
              <Link key={e.school} href={e.href} target="_blank" className="group flex-1 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all">
                {e.logoUrl && <img loading="lazy" decoding="async" src={e.logoUrl} alt={e.school} className="size-10 rounded-lg border border-white/10 object-contain p-1 bg-white/5 mb-4" />}
                <p className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{e.school}</p>
                <p className="text-sm text-slate-400 mt-1">{e.degree}</p>
                <p className="text-xs text-slate-600 mt-0.5">{e.start} – {e.end}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => {
              const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
              return (
                <div key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-indigo-400/40 hover:bg-indigo-950/60 transition-all">
                  {s.iconUrl ? <img loading="lazy" decoding="async" src={s.iconUrl} alt={s.name} className="size-4 object-contain" /> : Icon ? <Icon className="size-4 text-slate-400" /> : null}
                  <span className="text-sm text-slate-300">{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionLabel>Projects</SectionLabel>
          <ProjectsPaginated className="grid sm:grid-cols-2 gap-3">
            {projects.map(p => (
              <div key={p.title} className="group flex flex-col rounded-xl bg-white/[0.04] border border-white/[0.08] overflow-hidden hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-900/20 transition-all">
                {p.image
                  ? <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="w-full h-36 object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  : <div className="w-full h-36 bg-gradient-to-br from-indigo-950 to-slate-900" />}
                <div className="flex-1 flex flex-col gap-2 p-4">
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-slate-600">{p.dates}</p>
                  <p className="text-sm text-slate-400 flex-1 line-clamp-2">{projectSummary(p.description)}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.technologies.slice(0, 4).map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-800/60">{t}</span>)}
                  </div>
                  <div className="flex gap-3 mt-1">
                    {p.links.map((l, i) => (
                      <Link key={i} href={l.href} target="_blank" className="text-xs text-slate-600 hover:text-indigo-400 flex items-center gap-1 transition-colors font-medium">
                        {l.icon_type === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />}
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
        <section>
          <SectionLabel>Hackathons</SectionLabel>
          <div className="flex flex-col gap-3">
            {hackathons.map(h => (
              <div key={h.title} className="flex gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/30 transition-all">
                {h.image
                  ? <img loading="lazy" decoding="async" src={h.image} alt={h.title} className="size-10 rounded-lg border border-white/10 object-contain p-1 bg-white/5 shrink-0" />
                  : <div className="size-10 rounded-lg border border-white/10 bg-indigo-950 shrink-0" />}
                <div>
                  <p className="font-semibold text-white">{h.title}</p>
                  <p className="text-xs text-slate-600">{h.dates} · {h.location}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionLabel>Contact</SectionLabel>
          <div className="[&_label]:text-slate-400 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input::placeholder]:text-slate-700 [&_textarea]:bg-white/5 [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea::placeholder]:text-slate-700 [&_button[type=submit]]:bg-indigo-600 [&_button[type=submit]]:hover:bg-indigo-500 [&_button[type=submit]]:text-white [&_button[type=submit]]:border-0">
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
