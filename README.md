# 62 Moons Band Website

A production-ready marketing site and lightweight content management workflow for the band 62 Moons.

This project is intentionally built to demonstrate practical full-stack engineering in a portfolio context: modern frontend architecture, server-side integrations, authenticated admin tooling, and real-world deployment concerns.

## Project Goals

- Present a high-quality public-facing band website with a custom visual style.
- Allow non-technical band members to manage upcoming shows without touching code.
- Keep operational overhead low by using GitHub as the source of truth for show data.
- Support production analytics and performance observability on Vercel.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19 + Tailwind CSS 4
- Auth: NextAuth (credentials-based admin login)
- Email: Resend API (contact form delivery)
- Data Source: JSON file committed back to GitHub via GitHub Contents API
- Observability: Vercel Analytics + Vercel Speed Insights
- Tooling: ESLint, strict TypeScript config

## Architecture Highlights

### Public Site

- Route-driven pages under `src/app/`.
- Reusable UI components under `src/components/`.
- Upcoming shows rendered from `src/app/data/upcoming-shows.json`.
- Shows are normalized and sorted by date using shared domain logic in `src/types/show.ts`.

### Admin CMS Workflow

- Protected admin interface at `/admin`.
- Authenticated users can add/remove show entries in a dedicated editor UI.
- Publish action writes the updated JSON file directly to GitHub using:
  - `GET /repos/{owner}/{repo}/contents/{path}` to fetch current SHA
  - `PUT /repos/{owner}/{repo}/contents/{path}` to commit new content
- This creates a lightweight, auditable CMS flow without introducing a separate database.

### Security Model

- Admin route requires an authenticated session.
- Server actions also verify session state before mutation (defense in depth).
- Admin credentials and API tokens are stored in environment variables.
- Timing-safe credential comparison is used in auth configuration.

### Contact Form Integration

- Contact submissions are handled in `src/app/api/route.ts`.
- Backend sends formatted emails via Resend.
- Email body separates subject context, sender metadata, and message content for readability.

### Performance + Monitoring

- `@vercel/analytics` and `@vercel/speed-insights` are mounted globally in `src/app/layout.tsx`.
- Supports real-user traffic analytics and Core Web Vitals visibility in production.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Visit:

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Environment Variables

### Admin Authentication

- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

### GitHub Content Publishing

- `GITHUB_TOKEN` (fine-grained PAT with Contents read/write)
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH` (default: `main`)
- `GITHUB_SHOWS_PATH` (default: `src/app/data/upcoming-shows.json`)

### Contact Email

- `RESEND_API_KEY`

## NPM Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run ESLint

## Why This Project Is Portfolio-Relevant

- Demonstrates end-to-end ownership across frontend, backend integrations, and deployment.
- Uses modern React/Next.js patterns (App Router, server actions, typed domain models).
- Balances product simplicity with operational realism (auth, secure env handling, observability, and third-party APIs).
- Shows practical architectural decision-making: using GitHub-backed content updates as an intentional alternative to a full CMS/database.

## Deployment Notes

- Deploy target: Vercel.
- Configure the same environment variables in Vercel Project Settings.
- Rotate secrets/tokens when shared accidentally.
- Verify analytics and speed insights after first production traffic.
