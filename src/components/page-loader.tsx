"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LINES = [
  { text: "Initializing portfolio...", delay: 0 },
  { text: "Loading projects...",       delay: 400 },
  { text: "Fetching experience...",    delay: 500 },
  { text: "Building interface...",     delay: 800 },
  { text: "Welcome, Jawad Boulmal ✓", delay: 1200, highlight: true },
];

const CHARS = "01アイウエカキクケコ{}[]()<>=/\\+-_.,const let function return class import export async await=>interface type React Next".split("");

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fs   = 13;
    let drops  = Array(Math.floor(window.innerWidth / fs)).fill(0).map(() => Math.random() * -80);

    let raf: number;
    let last = 0;

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 50) return;
      last = ts;

      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const lead = y > 0 && Math.random() > 0.92;
        ctx.globalAlpha = lead ? 1 : 0.35 + Math.random() * 0.2;
        ctx.fillStyle   = lead ? "#ffffff" : "#00c853";
        if (y > 0) ctx.fillText(char, i * fs, y * fs);
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      });
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}
    />
  );
}

export function PageLoader() {
  const [mounted, setMounted]      = useState(false);
  const [phase, setPhase]          = useState<"in" | "out" | "gone">("in");
  const [visibleLines, setVisible] = useState<boolean[]>(LINES.map(() => false));

  useEffect(() => {
    setMounted(true);
    const t: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((line, i) => {
      t.push(setTimeout(() => {
        setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
      }, line.delay));
    });

    t.push(setTimeout(() => setPhase("out"),  2500));
    t.push(setTimeout(() => setPhase("gone"), 3000));

    return () => t.forEach(clearTimeout);
  }, []);

  if (!mounted || phase === "gone") return null;

  return createPortal(
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "#1d87d3",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", overflow: "hidden",
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scan  { 0%{top:-56px} 100%{top:100%} }
      `}</style>

      {/* Radial vignette to focus centre */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#040f17",
        pointerEvents: "none",
      }} />

      {/* Terminal card */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>
        <div style={{
          borderRadius: 8, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "#040f17",
          backdropFilter: "blur(12px)"
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,95,86,0.8)"  }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,189,46,0.8)" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(39,201,63,0.8)"  }} />
            <span style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              jawadboulmal@portfolio - bash
            </span>
          </div>

          {/* Body */}
          <div style={{ position: "relative", padding: "20px", minHeight: 190, overflow: "hidden" }}>
            {/* Scanline */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: 56, pointerEvents: "none",
              background: "linear-gradient(to bottom, transparent, rgba(0,200,83,0.04), transparent)",
              animation: "scan 2.5s linear infinite",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "monospace", fontSize: 13 }}>
              {LINES.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    opacity:   visibleLines[i] ? 1 : 0,
                    transform: visibleLines[i] ? "translateX(0)" : "translateX(-12px)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  <span style={{ color: "#00c853", flexShrink: 0 }}>❯</span>
                  <span style={{ color: line.highlight ? "#00e676" : "rgba(255,255,255,0.5)", fontWeight: line.highlight ? 600 : 400 }}>
                    {line.text}
                  </span>
                </div>
              ))}

              {/* Blinking cursor */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                opacity:   visibleLines[4] ? 1 : 0,
                transform: visibleLines[4] ? "translateX(0)" : "translateX(-12px)",
                transition: "opacity 0.35s ease 0.2s, transform 0.35s ease 0.2s",
              }}>
                <span style={{ color: "#00c853", flexShrink: 0 }}>❯</span>
                <span style={{
                  display: "inline-block", width: 8, height: 16,
                  background: "#00c853", verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <p style={{
          textAlign: "center", marginTop: 16,
          fontFamily: "monospace", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(0,200,83,0.5)",
          opacity: visibleLines[4] ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          Loading · Please wait
        </p>
      </div>
    </div>,
    document.body
  );
}
