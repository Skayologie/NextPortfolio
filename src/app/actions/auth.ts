"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";
import { createToken, TOKEN_NAME, TOKEN_MAX_AGE, verifyToken } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase-admin";

const SETTINGS_KEY = "dashboard_password_hash";

function hashPassword(password: string): string {
  const secret = process.env.DASHBOARD_SECRET ?? "";
  return createHash("sha256").update(password + secret).digest("hex");
}

async function getStoredHash(): Promise<string | null> {
  try {
    const { data } = await createAdminClient()
      .from("settings")
      .select("value")
      .eq("key", SETTINGS_KEY)
      .single();
    return data?.value ?? null;
  } catch {
    return null;
  }
}

async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = await getStoredHash();
  if (storedHash) {
    return hashPassword(password) === storedHash;
  }
  // fallback: plain env var comparison (initial setup)
  return password === process.env.DASHBOARD_PASSWORD;
}

export async function login(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const password = (formData.get("password") as string)?.trim();
  if (!password) return "Password is required.";

  if (!(await verifyPassword(password))) {
    return "Invalid password.";
  }

  const token = await createToken();
  const jar = await cookies();
  jar.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  });

  redirect("/dashboard/about");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(TOKEN_NAME);
  redirect("/dashboard/login");
}

export async function changePassword(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const jar = await cookies();
  const t = jar.get(TOKEN_NAME)?.value;
  if (!t || !(await verifyToken(t))) return "Unauthorized.";

  const current = (formData.get("current") as string)?.trim();
  const next = (formData.get("next") as string)?.trim();
  const confirm = (formData.get("confirm") as string)?.trim();

  if (!current || !next || !confirm) return "All fields are required.";
  if (next.length < 8) return "New password must be at least 8 characters.";
  if (next !== confirm) return "Passwords do not match.";
  if (!(await verifyPassword(current))) return "Current password is incorrect.";

  const hash = hashPassword(next);
  const { error } = await createAdminClient()
    .from("settings")
    .upsert({ key: SETTINGS_KEY, value: hash });

  if (error) return "Failed to save: " + error.message;
  return null; // null = success
}
