"use client";

import { useRef, useState, useTransition } from "react";
import { uploadImage } from "@/app/actions/upload";
import { Upload, Loader2 } from "lucide-react";

type Props = {
  onUpload: (url: string) => void;
  label?: string;
};

export function ImageUpload({ onUpload, label = "Upload image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const fd = new FormData();
    fd.set("file", file);

    startTransition(async () => {
      const result = await uploadImage(fd);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        onUpload(result.url);
      }
      if (inputRef.current) inputRef.current.value = "";
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={isPending}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50 w-fit"
      >
        {isPending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Upload className="size-3.5" />
        )}
        {isPending ? "Uploading…" : label}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
