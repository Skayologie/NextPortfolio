"use server";

import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyToken, TOKEN_NAME } from "@/lib/auth";

export type UploadResult = { url?: string; error?: string };

export async function uploadImage(fd: FormData): Promise<UploadResult> {
  const jar = await cookies();
  const t = jar.get(TOKEN_NAME)?.value;
  if (!t || !(await verifyToken(t))) return { error: "Unauthorized" };

  const file = fd.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed." };
  if (file.size > 5 * 1024 * 1024) return { error: "File must be under 5 MB." };

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { error: error.message };

  const { data: { publicUrl } } = supabase.storage
    .from("portfolio")
    .getPublicUrl(data.path);

  return { url: publicUrl };
}
