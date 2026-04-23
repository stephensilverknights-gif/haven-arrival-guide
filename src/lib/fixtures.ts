import type { UnitWithSteps } from './types'

/**
 * Dev-only fixture used when VITE_USE_FIXTURE === '1'. Lets us render the
 * guest page end-to-end without provisioning Supabase (useful for UI work
 * and the initial verification pass).
 */
const nowIso = new Date().toISOString()

const theLocalSteps: UnitWithSteps['arrival_steps'] = [
  ['Step 1 · Parking', 'Add parking directions in the admin. Upload a photo of the spot if helpful.', null],
  ['Step 2 · Walk to the building', 'Describe the walk from the car to the building entrance.', null],
  ['Step 3 · Main entry', 'Describe the main entrance of the building. Photo of the door is helpful.', null],
  ['Step 4 · Lockbox', 'Your key is in <strong>Lockbox #4</strong>. Tap the code below to copy it, enter it on the lockbox, and open the compartment to retrieve the key.', '1705'],
  ['Step 5 · Retrieve the key', 'Close the lockbox once the key is out. Please return the key to the same lockbox before you leave.', null],
  ['Step 6 · To the elevator', 'Directions from the lockbox to the elevator or stairs. Add a photo if helpful.', null],
  ['Step 7 · Sixth floor', 'Step out on the sixth floor. Describe which direction to turn.', null],
  ['Step 8 · Unit 620', 'Walk down the hallway to unit 620. A photo of the door is a nice reassurance.', null],
  ['Step 9 · Unlock the door', 'Any notes about the lock — sticky, pull up while turning, etc.', null],
  ['Step 10 · Entry lights', 'Location of the entry light switches.', null],
  ['Step 11 · Thermostat', 'Thermostat location + preferred settings.', null],
  ['Step 12 · Kitchen', 'Starter supplies, coffee, anything guests should know.', null],
  ['Step 13 · Bathroom & linens', 'Where to find extra towels + linens.', null],
  ['Step 14 · Bedroom', 'Anything notable about the bedroom setup.', null],
  ['Step 15 · TV & streaming', 'How to use the TV. Remote location, streaming logins if any.', null],
  ['Step 16 · Trash & recycling', 'Where trash and recycling go.', null],
  ["Step 17 · You're settled in", "Welcome to The Local. If anything feels off, text us — we're local and responsive.", null],
].map(([label, body, door_code], i) => ({
  id: `fx-${i + 1}`,
  unit_id: 'fixture-the-local',
  order_index: i,
  label: label as string,
  body: body as string,
  photo_url: null,
  door_code: door_code as string | null,
  created_at: nowIso,
  updated_at: nowIso,
}))

export const fixtureUnits: Record<string, UnitWithSteps> = {
  'the-local': {
    id: 'fixture-the-local',
    slug: 'the-local',
    name: 'The Local 620',
    address: '250 East Myrtle, Boise, ID',
    hero_image_url: null,
    welcome_message:
      "Welcome to The Local. <strong>Everything you need to get into unit 620 is below</strong> — follow the steps in order and you'll be settled in no time. Text us if anything feels off.",
    wifi_name: 'WhiteSky-TheLocal',
    wifi_password: 'kxpcva5d',
    youtube_id: 'RjJ3hye5wto',
    youtube_is_short: true,
    quiet_hours: '10pm - 8am',
    created_at: nowIso,
    updated_at: nowIso,
    arrival_steps: theLocalSteps,
  },
}

export const isFixtureMode = (): boolean =>
  import.meta.env.DEV && import.meta.env.VITE_USE_FIXTURE === '1'
