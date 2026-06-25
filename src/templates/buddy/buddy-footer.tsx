"use client";

import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "Hope you're having a great morning! ☀️";
  if (h >= 12 && h < 17) return "Hope you're having a lovely afternoon! 🌤️";
  if (h >= 17 && h < 21) return "Hope you're having a nice evening! 🌆";
  return "Hope you're having a great night! 🌙";
}

const FOOTER_COLOR = "#0b2235";

export function BuddyFooter({ displayName }: { displayName: string }) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => { setGreeting(getGreeting()); }, []);

  const socials = Object.entries(DATA.contact.social).filter(([, s]) => s.navbar);

  return (
    /*
      Layout (bottom to top z-order):
        z-0  footer body (dark background)
        z-10 character image  ← BEHIND the wave
        z-20 wave SVG         ← IN FRONT of character, hides its midsection

      Vertical positioning:
        Character top: -60px (above footer, feet visible in page area)
        Character height: ~200px (w-40 sitting pose)
        Character bottom: 140px into footer
        Wave peak: 40px into footer
        → feet visible above wave, body hidden behind wave, head hangs below wave
    */
    <footer className="relative w-full overflow-visible">

      {/* Character — behind the cloud wave */}
      <div
        className="absolute z-10 pointer-events-none select-none"
        style={{ left: "30%", top: "-80px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/buddy/standing.png"
          alt="companion behind the clouds"
          className="w-60 h-auto drop-shadow-2xl"
          style={{ transform: "rotate(0deg)" }}
        />
      </div>

      {/* Wave — in FRONT of character (z-20 > z-10) */}
      <div className="relative z-20 w-full" style={{ height: "120px" }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: FOOTER_COLOR, display: "block" }}
        >
          {/*
            Smooth cubic bezier mountain range.
            Horizontal tangents at every peak and valley = perfectly organic curves.
            Peaks:   x=300 y=35,  x=780 y=15,  x=1200 y=40
            Valleys: x=0 y=100, x=550 y=80, x=1000 y=75, x=1440 y=90
          */}
          <path d="
            M0,120 L0,100
            C 100,100 200,35  300,35
            C 400,35  450,80  550,80
            C 630,80  700,15  780,15
            C 860,15  920,75  1000,75
            C 1070,75 1130,40 1200,40
            C 1280,40 1380,90 1440,90
            L1440,120 Z
          " />
        </svg>
      </div>

      {/* Footer body */}
      <div
        className="relative z-20 px-6 pt-6 pb-28 flex justify-center text-center flex-col gap-4"
        style={{ background: `linear-gradient(to bottom, ${FOOTER_COLOR}, #040f1a)` }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-2xl font-bold mb-1">{displayName}</h2>
          {greeting && <p className="text-slate-300 text-sm mb-8">{greeting}</p>}

          <div className="flex flex-wrap justify-center gap-6">
            {socials.map(([name, s]) => {
              const Icon = s.icon;
              return (
                <a key={name} href={s.url} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-slate-400 hover:text-teal-300 text-sm transition-colors">
                  <Icon className="size-4 shrink-0" />
                  {name}
                </a>
              );
            })}
          </div>

          <p className="text-slate-700 text-xs mt-10">
            © {new Date().getFullYear()} {displayName} · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
