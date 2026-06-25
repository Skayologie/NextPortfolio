"use client";

import { useEffect } from "react";
import { BUILTIN_FONTS } from "@/lib/themes";

export function GoogleFontLoader({ family }: { family: string }) {
  useEffect(() => {
    if (!family || BUILTIN_FONTS.some(f => f.family === family)) return;
    const encoded = family.replace(/ /g, "+");
    const url = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [family]);
  return null;
}
