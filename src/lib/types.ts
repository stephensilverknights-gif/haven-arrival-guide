export interface Unit {
  id: string
  slug: string
  name: string
  address: string
  hero_image_url: string | null
  welcome_message: string | null
  wifi_name: string | null
  wifi_password: string | null
  youtube_id: string | null
  youtube_is_short: boolean
  quiet_hours: string | null
  created_at: string
  updated_at: string
}

export interface ArrivalStep {
  id: string
  unit_id: string
  order_index: number
  label: string
  body: string
  photo_url: string | null
  door_code: string | null
  created_at: string
  updated_at: string
}

export interface UnitWithSteps extends Unit {
  arrival_steps: ArrivalStep[]
}

// Shape used by the admin form when drafting a step — id may be a temporary
// client-side id for newly added rows that haven't been saved yet.
export interface StepDraft {
  id: string
  order_index: number
  label: string
  body: string
  photo_url: string | null
  door_code: string | null
  // True if this draft corresponds to an existing DB row (not yet saved delete/edit).
  persisted: boolean
}
