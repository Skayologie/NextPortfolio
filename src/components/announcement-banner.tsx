"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { BannerData } from "@/lib/portfolio-data";

const STYLES = {
  info:    "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-100",
  success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/60 dark:border-green-800 dark:text-green-100",
  warning: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-100",
  promo:   "bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200 text-violet-900 dark:from-violet-950/60 dark:to-fuchsia-950/60 dark:border-violet-800 dark:text-violet-100",
};

const LINK_STYLES = {
  info:    "underline underline-offset-2 hover:opacity-70 font-semibold",
  success: "underline underline-offset-2 hover:opacity-70 font-semibold",
  warning: "underline underline-offset-2 hover:opacity-70 font-semibold",
  promo:   "underline underline-offset-2 hover:opacity-70 font-semibold",
};

const LS_KEY = (msg: string) => `banner_dismissed_${btoa(msg).slice(0, 16)}`;

export default function AnnouncementBanner({ banner }: { banner: BannerData }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!banner.isActive || !banner.message) return;
    const dismissed = localStorage.getItem(LS_KEY(banner.message));
    if (!dismissed) {
      // tiny delay so the slide-in is visible on page load
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    }
  }, [banner.message, banner.isActive]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(LS_KEY(banner.message), "1");
  };

  if (!mounted || !banner.isActive || !banner.message) return null;

  return (
    <div
      role="banner"
      className={[
        "w-full border-b transition-all duration-500 ease-out overflow-hidden",
        STYLES[banner.style],
        visible ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
      ].join(" ")}
      style={{ transform: visible ? "translateY(0)" : "translateY(-8px)" }}
    >
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <p className="flex-1 text-sm text-center">
          {banner.message}
          {banner.linkUrl && banner.linkText && (
            <>
              {" "}
              <Link
                href={banner.linkUrl}
                target={banner.linkUrl.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={LINK_STYLES[banner.style]}
              >
                {banner.linkText} →
              </Link>
            </>
          )}
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
