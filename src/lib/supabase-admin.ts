import { createClient } from "@supabase/supabase-js";

// Uses the service role key — only safe to call from server-side code (Server Actions, Route Handlers).
// Never import this file in client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
