"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Returns a singleton browser Supabase client, or null if not configured. */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    // Implicit flow keeps auth fully client-side (token returned in the URL
    // hash), so no server callback route is needed for this env-gated feature.
    client = createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      auth: { flowType: "implicit", detectSessionInUrl: true },
    });
  }
  return client;
}
