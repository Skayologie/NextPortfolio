"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "before" | "visible" | "after";

interface Props {
  img: string;
  bubble: string;
  from: "left" | "right" | "bottom";
  size?: "md" | "lg";
}

export function BuddyFigure({ img, bubble, from, size = "md" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("before");
  const entered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entered.current = true;
          setPhase("visible");
        } else if (entered.current) {
          setPhase("after");
          const t = setTimeout(() => { setPhase("before"); entered.current = false; }, 550);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const enter =
    from === "left"   ? "-translate-x-14 opacity-0" :
    from === "right"  ? "translate-x-14 opacity-0"  :
                        "translate-y-10 opacity-0";

  const exit = "scale-90 opacity-0";

  const cls =
    phase === "visible" ? "translate-x-0 translate-y-0 scale-100 opacity-100" :
    phase === "after"   ? exit : enter;

  const imgW = size === "lg" ? "w-36 sm:w-44" : "w-24 sm:w-28";

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-2 transition-all duration-500 ease-out select-none ${cls}`}
    >
      {/* Speech bubble */}
      <div className="relative bg-white text-gray-800 text-[11px] leading-relaxed font-semibold px-3 py-2.5 rounded-2xl shadow-2xl text-center"
           style={{ maxWidth: size === "lg" ? "160px" : "140px" }}>
        {bubble}
        {/* Tail pointing down */}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-white" />
      </div>
      {/* Character image */}
      <img
        src={img}
        alt="companion"
        className={`${imgW} h-auto drop-shadow-2xl`}
      />
    </div>
  );
}
