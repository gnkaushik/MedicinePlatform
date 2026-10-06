# Medicine Platform

A modular digital healthcare marketplace POC built with Next.js, React, TypeScript and Tailwind CSS.

## Modules

- **Module 1 — Foundation:** responsive design system, Netlify configuration and GitHub Actions checks.
- **Module 2 — Authentication and app shell:** mock sign-in, responsive authenticated workspace, overview and account placeholder.
- **Module 3 — Home and medicines:** healthcare home experience, searchable mock medicine catalog, category filters and reusable medicine cards.

## Local development

Requires Node.js 20 or later.

```bash
npm ci
npm run dev
```

Visit `http://localhost:3000`. Sign in with any valid email address and a password of at least 8 characters. The mock sign-in accepts any credentials that meet those client-side requirements. Use `error@medicineplatform.test` to preview the sign-in error state.

The Home and Medicines pages are also available without signing in. The medicine catalog uses sample products and INR prices for demonstration; it does not place orders or check real availability.

“Remember me” stores the mock session in local browser storage; without it, the session lasts for the current browser tab. This POC does not provide real authentication or store credentials.

## Validation

```bash
npm run lint
npm run build
```

Every pull request targeting `main`, and every push to `main`, runs the same lint and production build through GitHub Actions.
