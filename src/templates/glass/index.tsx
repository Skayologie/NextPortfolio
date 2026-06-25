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

function GlassCard({ className = "", style, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${className}`} style={style}>
      {children}
    </div>
  );
}

function SecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-1 h-4 rounded-full shrink-0" style={{ background: "var(--tc-accent)" }} />
      <h2 className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "var(--tc-accent)" }}>{children}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

export default function GlassTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;
  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="relative min-h-screen pb-28 overflow-hidden"
        style={{
          background: customization.bgColor || "linear-gradient(135deg, #020617 0%, #0f172a 40%, #020617 100%)",
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >

      {/* Decorative blurred orbs — single color family */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(15,118,110,0.07) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-12">

        {/* Hero */}
        <GlassCard className="p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start" style={{ boxShadow: "0 0 0 1px rgba(20,184,166,0.08), 0 32px 64px -16px rgba(0,0,0,0.5)" }}>
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)", transform: "scale(1.6)", filter: "blur(12px)" }} />
            <Avatar className="relative size-24 border border-teal-500/30 shadow-2xl">
              <AvatarImage src={hero.avatarUrl} alt={hero.displayName} />
              <AvatarFallback className="bg-slate-800 text-teal-300 text-2xl">{hero.displayName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-teal-400/70 text-xs uppercase tracking-widest font-medium mb-2">Portfolio</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{hero.displayName}</h1>
            <p className="text-slate-400 mt-2 leading-relaxed">{hero.description}</p>
          </div>
        </GlassCard>

        {/* About */}
        <section>
          <SecLabel>About</SecLabel>
          <div className="text-slate-400 leading-relaxed"><Markdown>{about}</Markdown></div>
        </section>

        {/* Work */}
        <section>
          <SecLabel>Experience</SecLabel>
          <div className="flex flex-col gap-3">
            {work.map(w => (
              <GlassCard key={w.company} className="p-5 flex gap-4 hover:border-teal-500/20 hover:bg-white/[0.06] transition-all">
                {w.logoUrl
                  ? <img src={w.logoUrl} alt={w.company} className="size-10 rounded-xl border border-white/10 object-contain p-1 bg-white/5 shrink-0 mt-0.5" />
                  : <div className="size-10 rounded-xl border border-white/10 bg-teal-900/30 shrink-0 mt-0.5" />}
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
                      {w.badges.map(b => <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-teal-900/40 text-teal-300 border border-teal-800/60">{b}</span>)}
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SecLabel>Education</SecLabel>
          <div className="flex flex-col sm:flex-row gap-3">
            {education.map(e => (
              <Link key={e.school} href={e.href} target="_blank" className="group flex-1">
                <GlassCard className="p-5 h-full group-hover:border-teal-500/20 group-hover:bg-white/[0.06] transition-all">
                  {e.logoUrl && <img src={e.logoUrl} alt={e.school} className="size-10 rounded-xl border border-white/10 object-contain p-1 bg-white/5 mb-4" />}
                  <p className="font-semibold text-white group-hover:text-teal-300 transition-colors">{e.school}</p>
                  <p className="text-sm text-slate-400 mt-1">{e.degree}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{e.start} – {e.end}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <SecLabel>Skills</SecLabel>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => {
              const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
              return (
                <div key={s.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:border-teal-500/30 hover:bg-teal-950/30 transition-all">
                  {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="size-4 object-contain" /> : Icon ? <Icon className="size-4 text-slate-400" /> : null}
                  <span className="text-sm text-slate-300">{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SecLabel>Projects</SecLabel>
          <ProjectsPaginated className="grid sm:grid-cols-2 gap-3">
            {projects.map(p => (
              <GlassCard key={p.title} className="overflow-hidden flex flex-col hover:border-teal-500/20 hover:shadow-[0_0_20px_rgba(20,184,166,0.06)] transition-all">
                {p.image
                  ? <img src={p.image} alt={p.title} className="w-full h-36 object-cover opacity-50 hover:opacity-70 transition-opacity" />
                  : <div className="w-full h-36 bg-gradient-to-br from-teal-950/60 to-slate-900" />}
                <div className="flex-1 flex flex-col gap-2 p-4">
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-slate-600">{p.dates}</p>
                  <p className="text-sm text-slate-400 flex-1 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.technologies.slice(0, 4).map(t => <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">{t}</span>)}
                  </div>
                  <div className="flex gap-3 mt-1">
                    {p.links.map((l, i) => (
                      <Link key={i} href={l.href} target="_blank" className="text-xs text-slate-600 hover:text-teal-400 flex items-center gap-1 transition-colors font-medium">
                        {l.icon_type === "github" ? <Icons.github className="size-3" /> : <Icons.globe className="size-3" />}
                        {l.type}
                      </Link>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </ProjectsPaginated>
        </section>

        {/* Hackathons */}
        <section>
          <SecLabel>Hackathons</SecLabel>
          <div className="flex flex-col gap-3">
            {hackathons.map(h => (
              <GlassCard key={h.title} className="p-4 flex gap-4 hover:border-teal-500/20 transition-all">
                {h.image
                  ? <img src={h.image} alt={h.title} className="size-10 rounded-xl border border-white/10 object-contain p-1 bg-white/5 shrink-0" />
                  : <div className="size-10 rounded-xl border border-white/10 bg-teal-900/30 shrink-0" />}
                <div>
                  <p className="font-semibold text-white">{h.title}</p>
                  <p className="text-xs text-slate-600">{h.dates} · {h.location}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{h.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SecLabel>Contact</SecLabel>
          <GlassCard className="p-6">
            <div className="[&_label]:text-slate-400 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input::placeholder]:text-slate-700 [&_textarea]:bg-white/5 [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea::placeholder]:text-slate-700 [&_button[type=submit]]:bg-teal-500 [&_button[type=submit]]:hover:bg-teal-400 [&_button[type=submit]]:text-white [&_button[type=submit]]:border-0">
              <ContactForm />
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
    </>
  );
}
