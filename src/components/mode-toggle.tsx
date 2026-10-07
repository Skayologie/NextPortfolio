"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle color theme"
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon aria-hidden="true" className="h-full w-full dark:hidden" />
      <MoonIcon aria-hidden="true" className="hidden h-full w-full dark:block" />
    </Button>
  );
}
