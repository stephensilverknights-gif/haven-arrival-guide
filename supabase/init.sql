-- Haven Arrival Guide — one-paste initializer.
-- Equivalent to running 001_schema.sql → 002_storage.sql → 003_seed.sql →
-- 004_add_youtube_is_short.sql in order. Idempotent: safe to re-run.
--
-- Paste this entire file into the Supabase SQL editor and click Run.

--------------------------------------------------------------------------
-- 1. Tables
--------------------------------------------------------------------------

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
  youtube_is_short boolean not null default false,
  quiet_hours text,                   -- free text e.g. "10pm - 8am"
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Defensive: if the units table pre-existed without youtube_is_short,
-- add it now. (No-op on a fresh install.)
alter table public.units
  add column if not exists youtube_is_short boolean not null default false;

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

--------------------------------------------------------------------------
-- 2. updated_at trigger
--------------------------------------------------------------------------

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

--------------------------------------------------------------------------
-- 3. Row-level security — anon read, authenticated full access
--------------------------------------------------------------------------

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

--------------------------------------------------------------------------
-- 4. Storage buckets — public read, authenticated write
--------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('unit-hero-images', 'unit-hero-images', true),
  ('step-photos', 'step-photos', true)
on conflict (id) do nothing;

drop policy if exists hero_public_read on storage.objects;
create policy hero_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'unit-hero-images');

drop policy if exists hero_auth_write on storage.objects;
create policy hero_auth_write on storage.objects
  for all to authenticated
  using (bucket_id = 'unit-hero-images')
  with check (bucket_id = 'unit-hero-images');

drop policy if exists step_public_read on storage.objects;
create policy step_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'step-photos');

drop policy if exists step_auth_write on storage.objects;
create policy step_auth_write on storage.objects
  for all to authenticated
  using (bucket_id = 'step-photos')
  with check (bucket_id = 'step-photos');

--------------------------------------------------------------------------
-- 5. Seed — The Local 620 with 17 scaffold steps
--------------------------------------------------------------------------

insert into public.units (
  slug, name, address, hero_image_url,
  welcome_message, wifi_name, wifi_password,
  youtube_id, youtube_is_short, quiet_hours
) values (
  'the-local',
  'The Local 620',
  '250 East Myrtle, Boise, ID',
  null,
  'Welcome to The Local. <strong>Everything you need to get into unit 620 is below</strong> — follow the steps in order and you''ll be settled in no time. Text us if anything feels off.',
  'WhiteSky-TheLocal',
  'kxpcva5d',
  'RjJ3hye5wto',
  true,
  '10pm - 8am'
)
on conflict (slug) do nothing;

with u as (select id from public.units where slug = 'the-local')
insert into public.arrival_steps (unit_id, order_index, label, body, photo_url, door_code)
values
  ((select id from u),  0, 'Step 1 · Parking',
   'Add parking directions in the admin. Upload a photo of the spot if helpful.',
   null, null),
  ((select id from u),  1, 'Step 2 · Walk to the building',
   'Describe the walk from the car to the building entrance.',
   null, null),
  ((select id from u),  2, 'Step 3 · Main entry',
   'Describe the main entrance of the building. Photo of the door is helpful.',
   null, null),
  ((select id from u),  3, 'Step 4 · Lockbox',
   'Your key is in <strong>Lockbox #4</strong>. Tap the code below to copy it, enter it on the lockbox, and open the compartment to retrieve the key.',
   null, '1705'),
  ((select id from u),  4, 'Step 5 · Retrieve the key',
   'Close the lockbox once the key is out. Please return the key to the same lockbox before you leave.',
   null, null),
  ((select id from u),  5, 'Step 6 · To the elevator',
   'Directions from the lockbox to the elevator or stairs. Add a photo if helpful.',
   null, null),
  ((select id from u),  6, 'Step 7 · Sixth floor',
   'Step out on the sixth floor. Describe which direction to turn.',
   null, null),
  ((select id from u),  7, 'Step 8 · Unit 620',
   'Walk down the hallway to unit 620. A photo of the door is a nice reassurance.',
   null, null),
  ((select id from u),  8, 'Step 9 · Unlock the door',
   'Any notes about the lock — sticky, pull up while turning, etc.',
   null, null),
  ((select id from u),  9, 'Step 10 · Entry lights',
   'Location of the entry light switches.',
   null, null),
  ((select id from u), 10, 'Step 11 · Thermostat',
   'Thermostat location + preferred settings.',
   null, null),
  ((select id from u), 11, 'Step 12 · Kitchen',
   'Starter supplies, coffee, anything guests should know.',
   null, null),
  ((select id from u), 12, 'Step 13 · Bathroom & linens',
   'Where to find extra towels + linens.',
   null, null),
  ((select id from u), 13, 'Step 14 · Bedroom',
   'Anything notable about the bedroom setup.',
   null, null),
  ((select id from u), 14, 'Step 15 · TV & streaming',
   'How to use the TV. Remote location, streaming logins if any.',
   null, null),
  ((select id from u), 15, 'Step 16 · Trash & recycling',
   'Where trash and recycling go.',
   null, null),
  ((select id from u), 16, 'Step 17 · You''re settled in',
   'Welcome to The Local. If anything feels off, text us — we''re local and responsive.',
   null, null)
on conflict do nothing;
