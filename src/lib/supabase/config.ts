// Supabase is optional: the Studio editor works fully without it. Persistence
// (accounts, saved/shared playgrounds) lights up only when these env vars are
// present. See .env.example.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
