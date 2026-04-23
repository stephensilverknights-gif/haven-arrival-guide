-- Demo seed: The Local 620 — the first live unit. 17 scaffold steps so the
-- admin has every slot populated and can fill in copy/photos inline.
-- Safe to re-run: uses `on conflict do nothing`.

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

-- 17 arrival steps. Placeholder bodies are intentional — admin fills in the
-- property-specific details + photos via the editor. Lockbox step is fully
-- wired with the real code so the guest page is usable on day one.
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
