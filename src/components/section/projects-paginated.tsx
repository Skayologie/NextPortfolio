"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 4;

export function ProjectsPaginated({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [page, setPage] = useState(0);
  const all = React.Children.toArray(children);
  const totalPages = Math.ceil(all.length / PAGE_SIZE);
  const slice = all.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (all.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className={className}>{slice}</div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            aria-label="Previous projects"
            disabled={page === 0}
            className="flex items-center justify-center size-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Projects page ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
                onClick={() => setPage(i)}
                className={`size-11 rounded-full transition-colors ${i === page ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
              >{i + 1}</button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            aria-label="Next projects"
            disabled={page === totalPages - 1}
            className="flex items-center justify-center size-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
