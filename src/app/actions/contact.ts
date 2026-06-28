"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendTelegramNotification } from "@/lib/telegram";

export type ContactState = {
  success: boolean;
  message: string;
  rateLimited?: boolean;
  blockedUntil?: number;
} | null;

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const fullName = (formData.get("full_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!fullName || !email || !message) {
    return { success: false, message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? "unknown";

  const supabase = createAdminClient();

  if (ip !== "unknown") {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from("contact_messages")
      .select("created_at")
      .eq("ip_address", ip)
      .gte("created_at", cutoff)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recent) {
      const unlocksAt = new Date(recent.created_at).getTime() + 24 * 60 * 60 * 1000;
      const remainingMs = unlocksAt - Date.now();
      const h = Math.floor(remainingMs / 3_600_000);
      const m = Math.floor((remainingMs % 3_600_000) / 60_000);
      return {
        success: false,
        rateLimited: true,
        blockedUntil: unlocksAt,
        message: `You already sent a message. You can send another in ${h}h ${m}m.`,
      };
    }
  }

  try {
    const { error } = await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      message,
      ip_address: ip,
    });

    if (error) {
      return { success: false, message: "Failed to send message. Please try again." };
    }

    // Fire-and-forget Telegram notification (never blocks the response)
    sendTelegramNotification({ fullName, email, ip, message }).catch(() => {});

    return {
      success: true,
      blockedUntil: Date.now() + 24 * 60 * 60 * 1000,
      message: "Message sent! I'll get back to you soon.",
    };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
