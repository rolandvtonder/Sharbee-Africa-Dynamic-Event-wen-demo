# Sharbee Africa website

Vite + React + TypeScript + Tailwind CSS v4, with Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production files in dist/
```

## Pages

| URL | Page |
| --- | --- |
| `/` | Home — sunset film hero, three service panels, ideas, learner tours |
| `/about` | About us |
| `/services` | All services |
| `/services/travel-destinations` · `events-conferences` · `incentives-team-building` · `learner-tours` | One page per service |
| `/experiences` | Spotlight, fun facts, cultural cuisine, baobab, travel tips |
| `/gallery` | Facebook posts with a lightbox |
| `/contact` | Enquiry form (opens WhatsApp or email) and contact details |

## Editing

- **Words, phone numbers, services, ideas, gallery posts:** `src/content.ts`
- **Colours and fonts:** the `@theme` block at the top of `src/index.css`
- **Photos and films:** `public/media/` (gallery posts in `public/media/posts/`)

## Live demo

https://rolandvtonder.github.io/Sharbee-Africa-Dynamic-Event-wen-demo/

Every push to `main` rebuilds and republishes it through
`.github/workflows/deploy.yml` (GitHub Pages, source: GitHub Actions).

## Deploying elsewhere

Upload the contents of `dist/` to your host. Page URLs like `/about` need a
fallback to `index.html`: `.htaccess` (Apache / cPanel) and `_redirects`
(Netlify) are included and copied into `dist/` automatically.

Stock photography and film are from Pexels (free to use, no attribution
required).
