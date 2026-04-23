# Haven Arrival Guide

Guest-facing arrival guides for Haven by Design Stays properties, plus a small
protected admin area for creating and editing them.

- **Guest page** at `/arrive/<slug>` — static link you drop into Hostaway
  auto-messaging. No tokens, no dynamic variables, no API integrations.
- **Admin** at `/admin` — email/password auth (Supabase), CRUD for units and
  drag-reorderable arrival steps, image uploads to Supabase Storage.

Built with React 19 + Vite 8 + Tailwind 4 + Shadcn/UI + Supabase. Mirrors the
HavenHQ v2 project layout for easy cross-maintenance.

---

## Prerequisites

- Node.js 20+
- A Supabase project (free tier is plenty)
- Vercel account for deployment (optional)

---

## 1. Environment setup

```bash
cp .env.example .env.local
```

Fill in the two values from your Supabase project (Settings → API):

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

---

## 2. Database bootstrap

Run the SQL files in order in the Supabase **SQL editor** (each is safe
to re-run — they use `if not exists` and `on conflict do nothing`):

1. `supabase/001_schema.sql` — creates `units`, `arrival_steps`, RLS policies,
   indexes, and the `updated_at` trigger.
2. `supabase/002_storage.sql` — creates the `unit-hero-images` and `step-photos`
   storage buckets with public-read + authenticated-write policies.
3. `supabase/003_seed.sql` — inserts **The Local 620** with all 17 arrival
   steps scaffolded (lockbox code `1705` pre-wired) so `/arrive/the-local`
   is viewable immediately.
4. `supabase/004_add_youtube_is_short.sql` — adds the `youtube_is_short`
   column that renders the embedded walkthrough as a vertical 9:16 Short.

Alternatively, concatenate and paste all four at once.

---

## 3. Create the first admin user

This project doesn't ship a sign-up flow — admin accounts are provisioned by
you directly in Supabase.

1. Supabase dashboard → **Authentication → Users → Add user**.
2. Enter an email + password. Check **Auto Confirm User**.
3. You're done. Sign in at `/admin/login`.

---

## 4. Local development

```bash
npm install
npm run dev
```

Visit:

- Admin: `http://localhost:3002/admin/login`
- Guest (demo seed): `http://localhost:3002/arrive/the-local`

Port 3002 is pinned (HavenHQ uses 3001). Change in `vite.config.ts` if needed.

---

## 5. Production build

```bash
npm run build     # typechecks + vite build → dist/
npm run preview   # preview the production build locally
```

---

## 6. Deploy to Vercel

1. Push the repo to GitHub.
2. Vercel → **Add New → Project** → import the repo.
3. Framework: **Vite** (auto-detected).
4. Environment variables: set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   for both Preview and Production.
5. Deploy. `vercel.json` already contains the SPA rewrite so React Router
   deep links (like `/arrive/the-local`) work on refresh.

Once deployed, your guest links look like:
`https://<your-domain>/arrive/<slug>`

---

## Content model

Admins manage two concepts:

### Unit

One row per property. Fields:

- **Slug** — appears in the URL (`/arrive/<slug>`). Lowercase, numbers, dashes.
- **Name, Address** — hero text.
- **Hero image** — uploaded to the `unit-hero-images` bucket.
- **Welcome message** — short paragraph at the top. Inline `<strong>` allowed.
- **WiFi name + password** — shown in a pill; password is tap-to-copy.
- **Quiet hours** — free-text, shown next to WiFi.
- **YouTube video ID** — optional embedded walkthrough. Check the "vertical
  Short" box for 9:16 videos (uses the same embed URL — works for both
  standard videos and Shorts).

### Arrival steps

Ordered list under each unit. Each step has:

- **Label** (e.g. `Step 1 · Parking`)
- **Body** (inline `<strong>` allowed)
- **Photo** (optional, `step-photos` bucket)
- **Door code** (optional — renders as a charcoal code block with Copy button)

Steps can be dragged to reorder.

---

## Project layout

```
src/
  components/
    ui/          # Shadcn primitives (button, card, input, textarea, dialog, label, separator)
    guest/       # Guest-side components (Hero, WelcomeCard, InfoPills, StepList, Step, CodeBlock, VideoSection, Footer)
    admin/       # Admin-side components (ProtectedRoute, AdminLayout, UnitForm, StepEditor, StepRow, ImageUploadField)
  contexts/      # AuthContext (Supabase session wrapper)
  hooks/         # useUnit, useUnits, useUnitMutations, useStorageUpload
  lib/           # supabase.ts, types.ts, utils.ts
  pages/         # ArrivalGuide, NotFound, Login, UnitsList, UnitNew, UnitEdit
  App.tsx        # Route table
  main.tsx       # Providers (React Query, Router, Auth)
  index.css      # Tailwind v4 @theme + cream palette
supabase/
  001_schema.sql
  002_storage.sql
  003_seed.sql
```

---

## Conventions

- Guest content fields (`welcome_message`, step `body`) support inline
  `<strong>` via `dangerouslySetInnerHTML`. Content is admin-authored and
  RLS-protected, so this is intentional.
- Authentication is email/password only; user self-signup is disabled (no
  signup route). Provision admins via Supabase dashboard.
- React Query caches for 5 min stale / 10 min GC, no realtime.
- Images are kept in Supabase Storage; their public URLs are stored in the DB.
  Deleting a unit only cascades the step rows — storage objects are orphaned
  (safe; not user-visible).
