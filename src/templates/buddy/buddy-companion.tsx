"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = ["hero", "about", "work", "education", "skills", "projects", "hackathons", "contact"] as const;
type Section = (typeof SECTIONS)[number];

const POSES: Record<Section, { img: string; bubble: string; side: "left" | "right" }> = {
  hero:       { img: "/buddy/standing.png",      bubble: "Welcome to my portfolio! 👋",      side: "left"  },
  about:      { img: "/buddy/sitting-front.png", bubble: "Let me tell you about myself 😊",  side: "right" },
  work:       { img: "/buddy/sitting-side.png",  bubble: "Here's where I've worked! 💼",     side: "left"  },
  education:  { img: "/buddy/sitting-side.png",  bubble: "Where it all started 📚",          side: "right" },
  skills:     { img: "/buddy/sitting-front.png", bubble: "These are my superpowers! ⚡",     side: "left"  },
  projects:   { img: "/buddy/standing.png",      bubble: "Look what I built! 🎉",            side: "right" },
  hackathons: { img: "/buddy/sitting-side.png",  bubble: "Worth every sleepless night! 🏆", side: "left"  },
  contact:    { img: "/buddy/sitting-front.png", bubble: "Let's connect! 💬",                side: "right" },
};

// A single pose card — re-mounted each section change to retrigger the pop animation
function PoseCard({ img, bubble }: { img: string; bubble: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Bubble bounces in slightly after character */}
      <div className="buddy-bubble relative bg-white text-gray-800 text-[11px] leading-relaxed font-semibold px-3 py-2.5 rounded-2xl shadow-2xl text-center max-w-[148px]">
        {bubble}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-white" />
      </div>
      {/* Character bounces in, then floats continuously */}
      <div className="buddy-pop buddy-float">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="companion" className="w-28 h-auto drop-shadow-2xl select-none" />
      </div>
    </div>
  );
}

export default function BuddyCompanion() {
  const [active, setActive] = useState<Section>("hero");
  // animKey increments on every section change → re-mounts PoseCard → fresh pop animation
  const animKey = useRef(0);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(`buddy-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setActive(id);
            animKey.current += 1;
            setRenderKey(animKey.current);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const pose = POSES[active];

  return (
    <div className="hidden lg:block pointer-events-none select-none">
      {/* Left anchor point */}
      <div className="fixed left-6 bottom-24 z-20">
        {pose.side === "left" && (
          <PoseCard key={renderKey} img={pose.img} bubble={pose.bubble} />
        )}
      </div>

      {/* Right anchor point */}
      <div className="fixed right-6 bottom-24 z-20">
        {pose.side === "right" && (
          <PoseCard key={renderKey} img={pose.img} bubble={pose.bubble} />
        )}
      </div>
    </div>
  );
}
