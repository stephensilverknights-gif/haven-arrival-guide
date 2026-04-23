-- Storage buckets for hero images and per-step photos.
-- Both are public-read so the guest page can load images without auth.
-- Writes require an authenticated session (admin).

insert into storage.buckets (id, name, public)
values
  ('unit-hero-images', 'unit-hero-images', true),
  ('step-photos', 'step-photos', true)
on conflict (id) do nothing;

-- Storage policies live on storage.objects and are scoped by bucket_id.

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
