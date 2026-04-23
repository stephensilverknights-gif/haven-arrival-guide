# Haven Arrival Guide — conventions

Sister project to `haven-hq-v2`. Same stack, same folder layout. Differences:

- Cream/sage palette instead of dark/neon. See `src/index.css`.
- Fonts: **Cormorant Garamond** (serif headlines) + **DM Sans** (body).
- Auth is email/password only (no sign-up flow, no approval gate). Admins
  are created via the Supabase dashboard.
- No realtime subscriptions — content is read-mostly.

## Design reference

The guest page follows the mockup at
`C:\Users\steph\Downloads\arrival-guide-mockup.html`. Match spacing, type
scale, and staggered fade-up animation timings (0.2/0.35/0.5/0.65/0.75/0.85/0.95/1.1s)
exactly.

## Hard rules

- **No check-in/check-out times anywhere.** The brief explicitly excludes them.
- **Static link, no dynamic variables.** URL is `/arrive/<slug>` — never
  append query params or require admin touch between bookings.
- **Always run `npm run build` before pushing.** Per the user's MANDATORY
  pre-push rule (see user memory).
- **Never introduce a `.env` commit.** `.gitignore` excludes `.env.local` and
  friends.

## Code style

- Reach for Shadcn primitives for admin UI; guest components are hand-rolled
  with Tailwind utilities + inline `style` for pixel-accurate match to the
  mockup.
- `cn()` for class merging. `font-serif` / `font-sans` Tailwind utilities are
  wired via `--font-serif` / `--font-sans` in `@theme`.
- Cream palette colors are exposed as Tailwind utilities: `bg-cream`,
  `text-charcoal`, `text-mid`, `text-stone`, `text-sage`, `text-accent`, etc.
- React Query for all data; no ad-hoc `useEffect` fetching.
- `@dnd-kit` for drag-reorder in `StepEditor`.

## When adding guest-page features

Check the mockup first. If it's there, match the exact styling. If it's not,
ask the user before adding.

The mockup's "Need a hand?" sage CTA section was **intentionally deferred**
from the MVP. Don't reintroduce it without explicit ask.
