import { createClient } from "@supabase/supabase-js";

const URL      = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SVC_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

const anon  = createClient(URL, ANON_KEY);
const admin = createClient(URL, SVC_KEY);

const G = "\x1b[32m✓\x1b[0m";
const R = "\x1b[31m✗\x1b[0m";
const B = "\x1b[1m";
const X = "\x1b[0m";

// SELECT with RLS enabled returns 0 rows (no error) — NOT an error object.
async function checkSelect(label, client, table, expectBlocked) {
  const { data, error } = await client.from(table).select("id").limit(5);
  const rows = Array.isArray(data) ? data.length : 0;

  if (expectBlocked) {
    if (error || rows === 0) {
      console.log(`  ${G} ${label}: blocked — 0 rows visible (correct)`);
    } else {
      console.log(`  ${R} ${label}: NOT blocked — ${rows} row(s) exposed! Fix RLS.`);
    }
  } else {
    if (error) {
      console.log(`  ${R} ${label}: ERROR — ${error.message}`);
    } else {
      console.log(`  ${G} ${label}: ok — ${rows} row(s) readable`);
    }
  }
}

// INSERT: Supabase returns an error when RLS blocks it.
async function checkInsert(label, client, table, payload, expectBlocked) {
  const { error } = await client.from(table).insert(payload);
  if (expectBlocked) {
    if (error) {
      console.log(`  ${G} ${label}: blocked (correct)`);
    } else {
      console.log(`  ${R} ${label}: NOT blocked! Fix RLS.`);
    }
  } else {
    if (error) {
      console.log(`  ${R} ${label}: ERROR — ${error.message}`);
    } else {
      console.log(`  ${G} ${label}: ok`);
    }
  }
}

console.log(`\n${B}── Anon key · portfolio tables (SELECT only allowed) ──${X}`);
for (const t of ["about", "work_experience", "education", "projects", "hackathons"]) {
  await checkSelect(`SELECT ${t}`, anon, t, false);
}

console.log(`\n${B}── Anon key · contact_messages (fully blocked) ──${X}`);
await checkSelect("SELECT contact_messages", anon, "contact_messages", true);
await checkInsert("INSERT contact_messages", anon, "contact_messages",
  { full_name: "rls-test", email: "rls@test.com", message: "rls test" }, true);

console.log(`\n${B}── Service role · contact_messages (full access) ──${X}`);
await checkSelect("SELECT contact_messages", admin, "contact_messages", false);

console.log();
