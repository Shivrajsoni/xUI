-- xUI Studio: saved/shared component playgrounds.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists public.playgrounds (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  component_name text not null,
  title          text not null default 'Untitled',
  code           text not null,
  props          jsonb not null default '{}'::jsonb,
  is_public      boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists playgrounds_user_id_idx on public.playgrounds (user_id);
create index if not exists playgrounds_public_idx on public.playgrounds (is_public) where is_public;

alter table public.playgrounds enable row level security;

-- Owners can do anything with their rows.
drop policy if exists "playgrounds_owner_all" on public.playgrounds;
create policy "playgrounds_owner_all"
  on public.playgrounds
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Anyone can read playgrounds explicitly marked public (for shared links).
drop policy if exists "playgrounds_public_read" on public.playgrounds;
create policy "playgrounds_public_read"
  on public.playgrounds
  for select
  using (is_public = true);
