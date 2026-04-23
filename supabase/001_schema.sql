-- Haven Arrival Guide — core schema
-- Run this in the Supabase SQL editor once per project.

-- Units: one row per rental property / arrival guide.
create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  address text not null,
  hero_image_url text,
  welcome_message text,
  wifi_name text,
  wifi_password text,
  youtube_id text,
  quiet_hours text,                   -- free text e.g. "10pm - 8am"
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Arrival steps: ordered, many per unit. Each can carry a photo + optional door code.
create table if not exists public.arrival_steps (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  order_index int not null default 0,
  label text not null,
  body text not null,
  photo_url text,
  door_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists arrival_steps_unit_order_idx
  on public.arrival_steps(unit_id, order_index);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists units_set_updated_at on public.units;
create trigger units_set_updated_at
  before update on public.units
  for each row execute function public.set_updated_at();

drop trigger if exists arrival_steps_set_updated_at on public.arrival_steps;
create trigger arrival_steps_set_updated_at
  before update on public.arrival_steps
  for each row execute function public.set_updated_at();

-- Row-level security: anonymous read (guests view arrival guide by slug),
-- authenticated full access (admin UI).
alter table public.units enable row level security;
alter table public.arrival_steps enable row level security;

drop policy if exists units_public_read on public.units;
create policy units_public_read on public.units
  for select to anon, authenticated
  using (true);

drop policy if exists units_auth_write on public.units;
create policy units_auth_write on public.units
  for all to authenticated
  using (true)
  with check (true);

drop policy if exists arrival_steps_public_read on public.arrival_steps;
create policy arrival_steps_public_read on public.arrival_steps
  for select to anon, authenticated
  using (true);

drop policy if exists arrival_steps_auth_write on public.arrival_steps;
create policy arrival_steps_auth_write on public.arrival_steps
  for all to authenticated
  using (true)
  with check (true);
