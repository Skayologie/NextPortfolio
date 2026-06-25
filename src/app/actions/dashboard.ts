"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyToken, TOKEN_NAME } from "@/lib/auth";

export type AR = { success?: boolean; error?: string } | null;

async function requireAuth() {
  const jar = await cookies();
  const t = jar.get(TOKEN_NAME)?.value;
  if (!t || !(await verifyToken(t))) throw new Error("Unauthorized");
}

const db = () => createAdminClient();

// ── Theme ──────────────────────────────────────────────────────────
export async function saveTheme(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const theme = (fd.get("theme") as string) || "zinc";
  const fontFamily = (fd.get("font_family") as string)?.trim() ?? "";
  const { error } = await db().from("settings").upsert([
    { key: "portfolio_theme", value: theme },
    { key: "portfolio_font_family", value: fontFamily },
  ]);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/blog");
  return { success: true };
}

// ── Banner ─────────────────────────────────────────────────────────
export async function saveBanner(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const payload = {
    message: (fd.get("message") as string)?.trim() ?? "",
    style: (fd.get("style") as string) || "info",
    link_text: (fd.get("link_text") as string)?.trim() ?? "",
    link_url: (fd.get("link_url") as string)?.trim() ?? "",
    is_active: fd.get("is_active") === "true",
  };
  const { error } = await db().from("banner").upsert({ id: 1, ...payload });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/blog");
  return { success: true };
}

// ── Skills ─────────────────────────────────────────────────────────
export async function saveSkill(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const id = fd.get("id") as string;
  const payload = {
    name: (fd.get("name") as string)?.trim(),
    icon_key: (fd.get("icon_key") as string)?.trim(),
    icon_url: (fd.get("icon_url") as string)?.trim() ?? "",
    sort_order: Number(fd.get("sort_order") || 0),
  };
  if (!payload.name) return { error: "Name is required." };
  const { error } = id
    ? await db().from("skills").update(payload).eq("id", id)
    : await db().from("skills").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
export async function deleteSkill(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("skills").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Hero ───────────────────────────────────────────────────────────
export async function saveHero(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const display_name = (fd.get("display_name") as string)?.trim();
  const description = (fd.get("description") as string)?.trim();
  const avatar_url = (fd.get("avatar_url") as string)?.trim();
  if (!display_name || !description) return { error: "Name and description are required." };
  const { error } = await db().from("hero").upsert({ id: 1, display_name, description, avatar_url });
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── About ──────────────────────────────────────────────────────────
export async function saveAbout(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const content = (fd.get("content") as string)?.trim();
  if (!content) return { error: "Content is required." };
  const { error } = await db().from("about").upsert({ id: 1, content });
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Work ───────────────────────────────────────────────────────────
function workPayload(fd: FormData) {
  return {
    company: fd.get("company") as string,
    href: (fd.get("href") as string) || "#",
    location: (fd.get("location") as string) || "",
    title: fd.get("title") as string,
    logo_url: (fd.get("logo_url") as string) || "",
    start_date: fd.get("start_date") as string,
    end_date: (fd.get("end_date") as string) || null,
    description: (fd.get("description") as string) || "",
    badges: ((fd.get("badges") as string) || "").split(",").map((b) => b.trim()).filter(Boolean),
    sort_order: Number(fd.get("sort_order") || 0),
  };
}
export async function saveWork(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const id = fd.get("id") as string;
  const { error } = id
    ? await db().from("work_experience").update(workPayload(fd)).eq("id", id)
    : await db().from("work_experience").insert(workPayload(fd));
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
export async function deleteWork(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("work_experience").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Education ──────────────────────────────────────────────────────
function educationPayload(fd: FormData) {
  return {
    school: fd.get("school") as string,
    href: (fd.get("href") as string) || "#",
    degree: fd.get("degree") as string,
    logo_url: (fd.get("logo_url") as string) || "",
    start_year: fd.get("start_year") as string,
    end_year: fd.get("end_year") as string,
    sort_order: Number(fd.get("sort_order") || 0),
  };
}
export async function saveEducation(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const id = fd.get("id") as string;
  const { error } = id
    ? await db().from("education").update(educationPayload(fd)).eq("id", id)
    : await db().from("education").insert(educationPayload(fd));
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
export async function deleteEducation(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("education").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Projects ───────────────────────────────────────────────────────
function projectPayload(fd: FormData) {
  let links = [];
  try { links = JSON.parse((fd.get("links") as string) || "[]"); } catch { /* ignore */ }
  return {
    title: fd.get("title") as string,
    href: (fd.get("href") as string) || "#",
    dates: (fd.get("dates") as string) || "",
    is_active: fd.get("is_active") === "true",
    description: (fd.get("description") as string) || "",
    technologies: ((fd.get("technologies") as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
    image: (fd.get("image") as string) || "",
    video: (fd.get("video") as string) || "",
    links,
    sort_order: Number(fd.get("sort_order") || 0),
  };
}
export async function saveProject(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const id = fd.get("id") as string;
  const { error } = id
    ? await db().from("projects").update(projectPayload(fd)).eq("id", id)
    : await db().from("projects").insert(projectPayload(fd));
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
export async function deleteProject(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("projects").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Hackathons ─────────────────────────────────────────────────────
function hackathonPayload(fd: FormData) {
  let links = [];
  try { links = JSON.parse((fd.get("links") as string) || "[]"); } catch { /* ignore */ }
  return {
    title: fd.get("title") as string,
    dates: (fd.get("dates") as string) || "",
    location: (fd.get("location") as string) || "",
    description: (fd.get("description") as string) || "",
    image: (fd.get("image") as string) || "",
    mlh: (fd.get("mlh") as string) || "",
    links,
    sort_order: Number(fd.get("sort_order") || 0),
  };
}
export async function saveHackathon(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const id = fd.get("id") as string;
  const { error } = id
    ? await db().from("hackathons").update(hackathonPayload(fd)).eq("id", id)
    : await db().from("hackathons").insert(hackathonPayload(fd));
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}
export async function deleteHackathon(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("hackathons").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ── Messages ───────────────────────────────────────────────────────
export async function markRead(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("contact_messages").update({ is_read: true }).eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/dashboard/messages");
  return { success: true };
}
export async function deleteMessage(_: AR, fd: FormData): Promise<AR> {
  await requireAuth();
  const { error } = await db().from("contact_messages").delete().eq("id", fd.get("id") as string);
  if (error) return { error: error.message };
  revalidatePath("/dashboard/messages");
  return { success: true };
}
