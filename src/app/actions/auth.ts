"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createToken, TOKEN_NAME, TOKEN_MAX_AGE } from "@/lib/auth";

export async function login(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const password = (formData.get("password") as string)?.trim();

  if (password !== process.env.DASHBOARD_PASSWORD) {
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
