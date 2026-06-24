export const TOKEN_NAME = "ds_token";
export const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createToken(): Promise<string> {
  return hmac(process.env.DASHBOARD_SECRET!, process.env.DASHBOARD_PASSWORD!);
}

export async function verifyToken(token: string): Promise<boolean> {
  return token === (await createToken());
}
