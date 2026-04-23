-- Add a flag to render the embedded walkthrough as a vertical (9:16) Short
-- instead of a standard 16:9 video. Safe to re-run.

alter table public.units
  add column if not exists youtube_is_short boolean not null default false;
