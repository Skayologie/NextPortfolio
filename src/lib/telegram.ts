async function getCityFromIP(ip: string): Promise<string> {
  try {
    const res  = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`, { cache: "no-store" });
    const data = await res.json();
    if (data.city && data.country) return `${data.city}, ${data.country}`;
    if (data.city)    return data.city;
    if (data.country) return data.country;
  } catch { /* silently ignore */ }
  return "Unknown";
}

/**
 * Sends a Telegram notification when someone submits the contact form.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local
 */
export async function sendTelegramNotification(data: {
  fullName: string;
  email: string;
  ip: string;
  message: string;
}): Promise<void> {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping");
    return;
  }

  const [city, now] = await Promise.all([
    getCityFromIP(data.ip),
    Promise.resolve(new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Casablanca",
      dateStyle: "short",
      timeStyle: "short",
    })),
  ]);

  const text =
    `🔔 <b>New Contact Message</b>\n\n` +
    `👤 <b>Name:</b> ${esc(data.fullName)}\n` +
    `📧 <b>Email:</b> ${esc(data.email)}\n` +
    `🌍 <b>IP:</b> <code>${esc(data.ip)}</code>\n` +
    `📍 <b>City:</b> ${esc(city)}\n` +
    `📅 <b>Time:</b> ${now}\n\n` +
    `💬 <b>Message:</b>\n${esc(data.message)}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      }
    );
    if (!res.ok) {
      console.error("[Telegram] Failed:", await res.text());
    }
  } catch (err) {
    console.error("[Telegram] Network error:", err);
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
