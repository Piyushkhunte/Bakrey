# Project Handoff: Piyush's Bakery

## Overview

This is a Next.js 15 single-page marketing site for Piyush's Bakery in Bharati Vidyapeeth, Pune. It uses Supabase for newsletter signups and a future customer-review data source.

## Completed features

- Responsive bakery landing page with an announcement bar, sticky navigation, mobile menu, hero, promotions, product cards, story, testimonials, contact section, and footer.
- Phone and WhatsApp order calls to action.
- Static brand and product imagery, including optimized WebP variants.
- `POST /api/newsletter` endpoint that writes email signups with a Supabase service-role key.
- Supabase SQL schema for newsletter signups and customer reviews.
- Page metadata and global Tailwind-based styling.
- `.next` build output ignored by Git.

## Architecture

```text
app/
  layout.tsx                 Root HTML layout and metadata
  globals.css                Global CSS and shared utility classes
  page.tsx                   Homepage; static data and page UI
  api/newsletter/route.ts    Newsletter API endpoint

public/images/               Brand and product assets
supabase/schema.sql          Database schema and RLS policy
```

The site is currently static. Product information, reviews, business information, and contact details are hard-coded in `app/page.tsx`.

## Relevant files

- `app/page.tsx` — full homepage implementation and static content.
- `app/layout.tsx` — metadata and root document layout.
- `app/globals.css` — global styling, typography helpers, grain effect, footer utilities, and reduced-motion handling.
- `app/api/newsletter/route.ts` — server-side email validation and Supabase upsert.
- `supabase/schema.sql` — Supabase tables, constraints, RLS, and featured-review read policy.
- `.env.example` — required environment-variable names.
- `package.json` — scripts and dependencies.

## Git and working-tree state

Committed history:

- `bf544be` — Initial bakery website.
- `d03924d` — Mobile and asset optimization: removed tracked `.next` artefacts, added WebP assets, and updated page/layout/styles/ignore rules.

Current uncommitted work:

- Modified: `app/page.tsx`.
  - Replaces prior client-side interactions with normal anchors and native HTML.
  - Uses native image elements and WebP assets.
  - Shows a permanent welcome-offer toast.
- Untracked source assets:
  - `public/images/bakery-interior.jpg`
  - `public/images/desserts.jpg`
  - `public/images/hero-bakery.png`
  - `public/images/joy-homemade.png`
  - `public/images/logo.png`
  - `public/images/product-2.jpg` through `product-7.jpg`
  - `public/images/product-favourites.png`

The current page uses WebP assets. Decide whether to retain and commit these larger original JPEG/PNG files as source assets before the next commit.

## Dependencies and commands

Runtime dependencies:

- Next.js `^15.2.4` (the current lockfile resolves 15.5.23)
- React and React DOM `^19.0.0`
- `@supabase/supabase-js` `^2.49.1`

Development dependencies include TypeScript, Tailwind CSS, PostCSS, Autoprefixer, and Node/React type packages.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run start
```

Use `npm.cmd` in this Windows environment because the PowerShell execution policy blocks `npm.ps1`.

## Database setup

Run `supabase/schema.sql` once in the target Supabase project's SQL Editor.

It creates:

- `newsletter_signups`: UUID primary key, unique email, email-format check, and creation timestamp.
- `customer_reviews`: UUID primary key, customer fields, quote, 1–5 rating validation, featured flag, and creation timestamp.
- RLS on both tables.
- Public read access only for reviews with `is_featured = true`.

Set these environment variables locally and in the deployment host:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Known bugs and launch blockers

1. **Newsletter submission format mismatch.** The footer form posts native `application/x-www-form-urlencoded` data, but `app/api/newsletter/route.ts` calls `request.json()`. Normal form submissions will fail rather than save the email. Fix this by either restoring client-side JSON `fetch` submission or changing the route to read `request.formData()` and return a user-friendly result.
2. **Placeholder contacts.** `+919000000000`, its WhatsApp link, and the bakery email are placeholders and must be replaced.
3. **Unverified content.** Exact address, product inventory/prices, offer validity, reviews, business claims, and legal-policy links need owner confirmation.
4. **Build issue in this workspace.** `npm.cmd run build` starts compilation but fails with `EINVAL: invalid argument, readlink '.next/build-manifest.json'`. This appears related to Windows/OneDrive handling of generated `.next` files rather than an application compile error.
5. **No automated tests.** The project has no tests. The `lint` script uses `next lint`, which is not the current Next.js lint workflow and should be replaced with an explicitly configured ESLint command.
6. **SEO crawlability issues.** Policy pages (delivery-policy, privacy-policy, terms, refund-policy) and admin pages lacked sufficient internal links in raw HTML, affecting search engine discoverability. Fixed by adding navigation headers with links back to home/admin on all affected pages.

## Exact next steps

1. Fix newsletter request parsing and manually test valid, invalid, duplicate, missing-environment, and Supabase-error cases.
2. Create/configure the Supabase project, run `supabase/schema.sql`, and set the two required environment variables locally and in the deployment host.
3. Replace all placeholder contact, WhatsApp, email, address, and legal-policy links with approved production values.
4. Decide whether to commit the untracked JPEG/PNG originals, then commit `app/page.tsx` plus approved assets.
5. Remove only the generated `.next` folder, run `npm.cmd run build` again, and if the `readlink` error persists, build from a non-OneDrive location or CI environment.
6. Add browser checks for responsive navigation, anchor links, contact/order links, and newsletter signup behavior.
7. Add ESLint and automated tests, then deploy to a Next.js-compatible host such as Vercel with Supabase environment variables configured.


## Manual Development Updates — August 2026

### Admin Dashboard
- Added `/admin` dashboard structure.
- Added management sections for orders, products, categories and reviews.
- Existing Supabase/Sanity systems are being reused.
- Admin authentication/authorization: TODO
- Admin statistics connected to live database: TODO
- Admin order management: TODO
- Admin product CRUD: TODO
- Admin review moderation: TODO

### Cookie Consent
- Added CookieConsent component.
- Added persistent consent using localStorage.
- Added Accept and Reject non-essential options.
- Cart and existing website functionality must remain unaffected.

### Bakery Team Section
- Replaced/expanded the empty "Talk to our cake team" section.
- Changed wording to "Talk to our bakery team" because the website sells cakes, pastries, food, snacks and savouries.
- Added bakery support description.
- Added WhatsApp CTA.
- Added phone-call CTA.

### Existing Working Features
- Cart working.
- Checkout working.
- Razorpay test payment working.
- `/api/orders` working.
- `/api/payment/create-order` working.
- `/api/payment/verify` working.
- Reviews API working.
- Privacy Policy working.
- Terms & Conditions working.
- Refund Policy working.
- Delivery Policy working.

### SEO Improvements — August 2026
- Added navigation headers with internal links to all policy pages (delivery-policy, privacy-policy, terms, refund-policy) and admin pages (admin/orders, admin/products, admin/reviews).
- Each page now includes a header with links back to home (or admin dashboard) for improved crawlability and PageRank distribution.
- Policy pages now have `robots: { index: true, follow: true }` metadata allowing search engines to crawl and follow links.

### Known Issues / TODO
- MSG91 OTP authentication currently returns 401 AuthenticationFailure.
- Gemini AI food assistant currently returns HTTP 503.
- Admin authentication still needs to be implemented.
- Admin live statistics still need database integration.
- Custom transactional payment SMS still requires proper MSG91 SMS/Flow configuration.
