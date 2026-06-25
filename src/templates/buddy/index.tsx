/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Markdown from "react-markdown";
import { ContactForm } from "@/components/section/contact-form";
import { SKILL_ICONS } from "@/lib/skill-icons";
import { Icons } from "@/components/icons";
import { BuddyFooter } from "./buddy-footer";
import { GoogleFontLoader } from "@/components/google-font-loader";
import type { PortfolioData } from "@/templates/types";

function SecTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <h2 className="text-xs font-black uppercase tracking-[0.28em] shrink-0" style={{ color: "var(--tc-accent)" }}>{children}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

export default function BuddyTemplate({ data }: { data: PortfolioData }) {
  const { hero, about, work, education, skills, projects, hackathons, customization } = data;

  return (
    <>
      {customization.fontFamily && <GoogleFontLoader family={customization.fontFamily} />}
      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: customization.bgColor || "linear-gradient(160deg, #0e1c27 0%, #0b1821 50%, #091520 100%)",
          "--tc-accent": customization.accentColor,
          fontFamily: customization.fontFamily ? `'${customization.fontFamily}', sans-serif` : undefined,
        } as React.CSSProperties}
      >
      {/* Dot grid */}
      <div
        className="pointer-events-none select-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 flex flex-col gap-16 py-20">

        {/* ── HERO ── */}
        <section id="buddy-hero" className="flex flex-col sm:flex-row items-center gap-10 pt-4">
          <div className="flex-1 text-center sm:text-left order-2 sm:order-1">
            <p className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Hey, I&apos;m{" "}
              <br />
              <span className="text-teal-400">{hero.displayName}</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">{hero.description}</p>
          </div>
          <div className="shrink-0 order-1 sm:order-2">
            <img
              src="/buddy/waving.png"
              alt="3D character"
              className="w-40 sm:w-52 h-auto drop-shadow-2xl"
            />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="buddy-about">
          <SecTitle>About Me</SecTitle>
          <div className="text-slate-300 leading-relaxed prose max-w-full prose-invert prose-p:my-2">
            <Markdown>{about}</Markdown>
          </div>
        </section>

        {/* ── WORK ── */}
        <section id="buddy-work">
          <SecTitle>Work Experience</SecTitle>
          <div className="flex flex-col gap-3">
            {work.map(w => (
              <div
                key={w.company}
                className="flex gap-4 p-5 rounded-2xl border border-white/[0.08] hover:border-teal-500/30 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {w.logoUrl
                  ? <img src={w.logoUrl} alt={w.company} className="size-11 rounded-xl border border-white/10 object-contain p-1 bg-white/5 shrink-0 mt-0.5" />
                  : <div className="size-11 rounded-xl border border-white/10 bg-teal-900/30 shrink-0 mt-0.5 flex items-center justify-center text-teal-400 font-bold">{w.company[0]}</div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <p className="font-semibold text-white">{w.company}</p>
                      <p className="text-sm text-slate-400">{w.title}</p>
                    </div>
                    <span className="text-xs text-slate-600 tabular-nums shrink-0">{w.start} – {w.end ?? "Now"}</span>
                  </div>
                  {w.description && <p className="text-sm text-slate-400 mt-1">{w.description}</p>}
                  {w.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {w.badges.map(b => (
                        <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-teal-900/50 text-teal-300 border border-teal-800/60">{b}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="buddy-education">
          <SecTitle>Education</SecTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            {education.map(e => (
              <Link
                key={e.school}
                href={e.href}
                target="_blank"
                className="group flex-1 p-5 rounded-2xl border border-white/[0.08] hover:border-teal-500/30 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {e.logoUrl && (
                  <img src={e.logoUrl} alt={e.school} className="size-10 rounded-xl border border-white/10 object-contain p-1 bg-white/5 mb-4" />
                )}
                <p className="font-semibold text-white group-hover:text-teal-300 transition-colors">{e.school}</p>
                <p className="text-sm text-slate-400 mt-1">{e.degree}</p>
                <p className="text-xs text-slate-600 mt-0.5">{e.start} – {e.end}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="buddy-skills">
          <SecTitle>Skills</SecTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => {
              const Icon = !s.iconUrl ? SKILL_ICONS[s.iconKey] : null;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] hover:border-teal-500/30 hover:bg-teal-950/30 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {s.iconUrl
                    ? <img src={s.iconUrl} alt={s.name} className="size-5 object-contain" />
                    : Icon ? <Icon className="size-5 text-slate-400" /> : null}
                  <span className="text-sm text-slate-300">{s.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="buddy-projects">
          <SecTitle>Projects</SecTitle>
          <div className="grid sm:grid-cols-2 gap-3">
            {projects.map(p => (
              <div
                key={p.title}
                className="group flex flex-col rounded-2xl border border-white/[0.08] overflow-hidden hover:border-teal-500/30 transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {p.image
                  ? <img src={p.image} alt={p.title} className="w-full h-32 object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  : <div className="w-full h-32" style={{ background: "linear-gradient(135deg, #0f2a35, #0e1c27)" }} />}
                <div className="flex-1 flex flex-col gap-2 p-4">
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-slate-600">{p.dates}</p>
                  <p className="text-sm text-slate-400 flex-1 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.technologies.slice(0, 4).map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">{t}</span>
                    ))}
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
              </div>
            ))}
          </div>
        </section>

        {/* ── HACKATHONS ── */}
        {hackathons.length > 0 && (
          <section id="buddy-hackathons">
            <SecTitle>Hackathons</SecTitle>
            <div className="flex flex-col gap-3">
              {hackathons.map(h => (
                <div
                  key={h.title}
                  className="flex gap-4 p-4 rounded-2xl border border-white/[0.08] hover:border-teal-500/30 transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {h.image
                    ? <img src={h.image} alt={h.title} className="size-11 rounded-xl border border-white/10 object-contain p-1 bg-white/5 shrink-0" />
                    : <div className="size-11 rounded-xl border border-white/10 bg-teal-900/30 shrink-0 flex items-center justify-center text-teal-400 font-bold text-lg">🏆</div>}
                  <div>
                    <p className="font-semibold text-white">{h.title}</p>
                    <p className="text-xs text-slate-600">{h.dates} · {h.location}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONTACT ── */}
        <section id="buddy-contact">
          <SecTitle>Let&apos;s Talk</SecTitle>
          <p className="text-slate-400 mb-6">Have a project in mind or just want to say hi?</p>
          <div
            className="p-6 rounded-2xl border border-white/[0.08]"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="[&_label]:text-slate-400 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input::placeholder]:text-slate-700 [&_textarea]:bg-white/5 [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea::placeholder]:text-slate-700 [&_button[type=submit]]:bg-teal-500 [&_button[type=submit]]:hover:bg-teal-400 [&_button[type=submit]]:text-white [&_button[type=submit]]:border-0">
              <ContactForm />
            </div>
          </div>
        </section>

      </div>

      {/* Full-width footer with wavy separator and upside-down character */}
      <BuddyFooter displayName={hero.displayName} />
    </main>
    </>
  );
}
