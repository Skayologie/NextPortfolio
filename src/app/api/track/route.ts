import { createAdminClient } from "@/lib/supabase-admin";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { page } = await req.json();
    if (!page || typeof page !== "string") return Response.json({ ok: false });

    const h = await headers();
    const ua = h.get("user-agent") ?? "";

    // Skip obvious bots
    if (/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(ua)) {
      return Response.json({ ok: false, reason: "bot" });
    }

    const referrer = h.get("referer") ?? "";
    // Vercel / most proxies set x-forwarded-for; fall back to x-real-ip
    const forwarded = h.get("x-forwarded-for");
    const ip_address = forwarded ? forwarded.split(",")[0].trim() : (h.get("x-real-ip") ?? "");

    await createAdminClient().from("page_views").insert({ page, referrer, ip_address });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
