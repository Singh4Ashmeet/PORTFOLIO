# Ashmeet Singh Portfolio

Production Next.js 14 portfolio for Ashmeet Singh, built around a dark editorial developer-portfolio system and data-driven content.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS with CSS variables
- Space Grotesk and Space Mono via `next/font`
- Framer Motion with reduced-motion handling
- Lucide React icons
- SendGrid contact route
- Plausible analytics hook
- Content from `data/*.json`

## Routes

- `/`
- `/about`
- `/projects`
- `/projects/[slug]`
- `/resume`
- `/contact`
- `/blog`

## Local Development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`:

```text
SENDGRID_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

The contact route returns a configuration error until the SendGrid variables are set.

## Content Updates

Edit the JSON files in `data/` for projects, case studies, skills, leadership, achievements, contact labels, and profile details.

The current `public/ashmeet.jpg` is a local placeholder because the chat-attached portrait was not exposed as a filesystem file. Replace that file with the final profile image when available.

## Verification

```powershell
npm run lint
npm run type-check
npm run format:check
npm run build
```
