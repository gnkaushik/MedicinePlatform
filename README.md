# Medicine Platform

POC for a modular digital healthcare marketplace.

## Module 1 — Foundation

- Next.js 15 + TypeScript
- Tailwind CSS
- Responsive application shell
- Shared design tokens
- Netlify configuration
- GitHub Actions build validation
- No backend or database

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

Every pull request targeting `main`, and every merge/push to `main`, runs the same lint + production build through GitHub Actions.
