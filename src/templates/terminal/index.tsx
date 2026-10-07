import { projectSummary, projectPath } from "@/lib/projects";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContactForm } from "@/components/section/contact-form";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { Icons } from "@/components/icons";
import { GoogleFontLoader } from "@/components/google-font-loader";
import { ProjectsPaginated } from "@/components/section/projects-paginated";
import type { PortfolioData } from "@/templates/types";

// ── "Noir" ─ Inspired by Emil Kowalski's dark-premium portfolio ──
// Dark zinc-950 background, refined whitespace, zero gimmicks.

function Sec({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-[11px] text-zinc-700 shrink-0">{n}</span>
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

export default function TerminalTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="min-h-screen text-white pb-28"
        style={{
          background: customization.bgColor || "#09090b",
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">

        {/* Hero */}
        <header className="flex items-start justify-between gap-6 mb-24">
          <div className="flex-1">
            <span className="text-xs text-zinc-700 tracking-widest uppercase mb-5 block">Portfolio</span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none mb-5">{hero.displayName}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">{hero.description}</p>
          </div>
          <Avatar className="size-20 shrink-0 ring-1 ring-zinc-800 shadow-2xl shadow-black/60 mt-1">
            <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
            <AvatarFallback className="bg-zinc-900 text-zinc-300 text-xl">{hero.displayName[0]}</AvatarFallback>
          </Avatar>
        </header>

        {/* About */}
        <section className="mb-20">
          <Sec n="01" title="About" />
          <div className="text-zinc-400 leading-relaxed"><Markdown>{about}</Markdown></div>
        </section>

        {/* Work */}
        <section className="mb-20">
          <Sec n="02" title="Experience" />
          <div className="flex flex-col">
            {work.map(w => (
              <div key={w.company} className="flex gap-4 py-6 border-b border-zinc-900 last:border-0">
                {w.logoUrl
                  ? <img loading="lazy" decoding="async" src={w.logoUrl} alt={w.company} className="size-9 rounded-lg border border-zinc-800 object-contain p-1 bg-zinc-900 shrink-0 mt-0.5" />
                  : <div className="size-9 rounded-lg border border-zinc-800 bg-zinc-900 shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <p className="font-semibold text-white">{w.company}</p>
                      <p className="text-sm text-zinc-500">{w.title}</p>
                    </div>
                    <span className="text-xs text-zinc-700 tabular-nums">{w.start} – {w.end ?? "Now"}</span>
                  </div>
                  {w.description && <p className="text-sm text-zinc-500 mt-1">{w.description}</p>}
                  {w.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.badges.map(b => <span key={b} className="text-xs px-2 py-0.5 rounded border border-zinc-800 text-zinc-600">{b}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <Sec n="03" title="Education" />
          <div className="flex flex-col gap-5">
            {education.map(e => (
              <Link key={e.school} href={e.href} target="_blank" className="flex gap-4 items-center group">
                {e.logoUrl
                  ? <img loading="lazy" decoding="async" src={e.logoUrl} alt={e.school} className="size-9 rounded-lg border border-zinc-800 object-contain p-1 bg-zinc-900 shrink-0" />
                  : <div className="size-9 rounded-lg border border-zinc-800 bg-zinc-900 shrink-0" />}
                <div className="flex-1">
                  <p className="font-semibold text-white group-hover:text-zinc-300 transition-colors">{e.school}</p>
                  <p className="text-sm text-zinc-500">{e.degree}</p>
                </div>
                <span className="text-xs text-zinc-700 tabular-nums shrink-0">{e.start} – {e.end}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <Sec n="04" title="Skills" />
          <div className="flex flex-wrap gap-2">
            {skills.map(s => {
              const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
              return (
                <div key={s.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all">
                  {s.iconUrl ? <img loading="lazy" decoding="async" src={s.iconUrl} alt={s.name} className="size-4 object-contain" /> : Icon ? <Icon className="size-4 text-zinc-500" /> : null}
                  <span className="text-sm text-zinc-300">{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <Sec n="05" title="Projects" />
          <ProjectsPaginated className="grid sm:grid-cols-2 gap-3">
            {projects.map(p => (
              <div key={p.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden group hover:border-zinc-700 transition-all">
                {p.image
                  ? <img loading="lazy" decoding="async" src={p.image} alt={p.title} className="w-full h-32 object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                  : <div className="w-full h-32 bg-zinc-900" />}
                <div className="p-4">
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-zinc-700 mb-1">{p.dates}</p>
                  <p className="text-sm text-zinc-500 line-clamp-2">{projectSummary(p.description)}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.technologies.slice(0, 4).map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{t}</span>)}
                  </div>
                  <div className="flex gap-3 mt-2">
                    {p.links.map((l, i) => (
                      <Link key={i} href={l.href} target="_blank" className="text-xs text-zinc-600 hover:text-white flex items-center gap-1 transition-colors">
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
        <section className="mb-20">
          <Sec n="06" title="Hackathons" />
          <div className="flex flex-col gap-5">
            {hackathons.map(h => (
              <div key={h.title} className="flex gap-4">
                {h.image
                  ? <img loading="lazy" decoding="async" src={h.image} alt={h.title} className="size-10 rounded-lg border border-zinc-800 object-contain p-1 bg-zinc-900 shrink-0" />
                  : <div className="size-10 rounded-lg border border-zinc-800 bg-zinc-900 shrink-0" />}
                <div>
                  <p className="font-semibold text-white">{h.title}</p>
                  <p className="text-xs text-zinc-700">{h.dates} · {h.location}</p>
                  <p className="text-sm text-zinc-500 mt-0.5">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <Sec n="07" title="Contact" />
          <div className="[&_label]:text-zinc-500 [&_input]:bg-zinc-900 [&_input]:border-zinc-800 [&_input]:text-white [&_input::placeholder]:text-zinc-700 [&_textarea]:bg-zinc-900 [&_textarea]:border-zinc-800 [&_textarea]:text-white [&_textarea::placeholder]:text-zinc-700 [&_button[type=submit]]:bg-white [&_button[type=submit]]:text-zinc-950 [&_button[type=submit]]:hover:bg-zinc-200">
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
