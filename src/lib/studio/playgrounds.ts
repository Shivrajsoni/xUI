"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export interface PlaygroundRecord {
  id: string;
  user_id: string;
  component_name: string;
  title: string;
  code: string;
  props: Record<string, unknown>;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavePlaygroundInput {
  id?: string;
  componentName: string;
  title: string;
  code: string;
  props: Record<string, unknown>;
  isPublic?: boolean;
}

/** Insert or update a playground for the signed-in user. Returns its id. */
export async function savePlayground(
  input: SavePlaygroundInput
): Promise<string> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be signed in to save.");

  const row = {
    ...(input.id ? { id: input.id } : {}),
    user_id: user.id,
    component_name: input.componentName,
    title: input.title,
    code: input.code,
    props: input.props,
    is_public: input.isPublic ?? false,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("playgrounds")
    .upsert(row)
    .select("id")
    .single();

  if (error) throw error;
  return (data as { id: string }).id;
}

/** Load a playground by id (own or public, enforced by RLS). */
export async function loadPlayground(
  id: string
): Promise<PlaygroundRecord | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("playgrounds")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as PlaygroundRecord | null;
}
