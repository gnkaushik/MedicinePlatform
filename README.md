# Medicine Platform

A modular digital healthcare marketplace POC built with Next.js, React, TypeScript and Tailwind CSS.

## Modules

- **Module 1 — Foundation:** responsive design system, Netlify configuration and GitHub Actions checks.
- **Module 2 — Authentication and app shell:** mock sign-in, responsive authenticated workspace, overview and account placeholder.
- **Module 3 — Home and medicines:** healthcare home experience, searchable mock medicine catalog, category filters and reusable medicine cards.

- **Module 4 — Product details and cart foundation:** medicine details, related products, and a shared in-memory cart with quantity controls and summary.
- **Module 5 — Checkout and order flow:** validated mock checkout, local-only prescription picker, review step, temporary order confirmation, and a small Orders foundation.
- **Module 6 — Orders and account:** authenticated order history and details, account profile/preferences, and prescription references derived from in-memory demo orders.
- **Module 7 — Healthcare services:** searchable mock doctor consultations and lab test catalogs with session-only appointment and collection booking flows.

## Local development

Requires Node.js 20 or later.

```bash
npm ci
npm run dev
```

Visit `http://localhost:3000`. Sign in with any valid email address and a password of at least 8 characters. The mock sign-in accepts any credentials that meet those client-side requirements. Use `error@medicineplatform.test` to preview the sign-in error state.

The Home and Medicines pages are also available without signing in. The catalog uses sample products and INR prices. Cart, checkout details, and mock orders use shared in-memory state; no payment or real fulfillment is provided. The prescription picker retains only file metadata in the browser session and never sends file contents to a backend.

The authenticated workspace includes Orders, prescription references, and profile preferences. These screens use the current in-memory order state and mock sign-in details only; refreshing or ending the session clears demo order history and preference changes.

Consultation providers, lab tests, availability, and healthcare bookings are also mock data held in memory for the current session. No provider, calendar, video, lab, or payment service is connected.

“Remember me” stores the mock session in local browser storage; without it, the session lasts for the current browser tab. This POC does not provide real authentication or store credentials.

## Validation

```bash
npm run lint
npm run build
```

Every pull request targeting `main`, and every push to `main`, runs the same lint and production build through GitHub Actions.

## Netlify deployment

The repository uses Netlify's Next.js framework plugin with `npm run build` and `.next` as the publish directory. Netlify supplies the site `URL` used for canonical metadata and the generated sitemap. No application environment variables are required for this mock-data POC. All account, order, prescription, and booking state remains local to the browser session; no production data service is configured.
