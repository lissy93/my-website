# my-website

Personal site, built with SvelteKit 2 + Svelte 5.

## Develop

```bash
npm install
npm run dev
```

| Script            | Does                         |
| ----------------- | ---------------------------- |
| `npm run dev`     | Dev server                   |
| `npm run build`   | Production build             |
| `npm run preview` | Preview the production build |
| `npm start`       | Serve the Node build         |
| `npm run check`   | Type-check                   |
| `npm run lint`    | Prettier + ESLint            |
| `npm run format`  | Write Prettier fixes         |

## Deploy

The adapter is picked from the environment in `svelte.config.js`:

- **Vercel** — `VERCEL` is set, uses `adapter-vercel`. Zero config.
- **Netlify** — `NETLIFY` is set, uses `adapter-netlify`. See `netlify.toml`.
- **Anywhere else** — `adapter-node`, output in `build/`, run with `node build`.

### Docker

```bash
docker build -t my-website .
docker run -p 3000:3000 -e ORIGIN=http://localhost:3000 my-website
```

Or `docker compose up --build`.

`ORIGIN` must match the URL the site is served from, or `adapter-node` rejects
the contact form's POST as cross-site. Everything else the server reads is
listed in `.env.example`; without it the site still builds and renders, it just
falls back to `content.ts` for project stats and can't send mail.

## Structure

```
src/
  lib/
    components/   shared components
    fonts/        self-hosted woff2
    server/       GitHub, RSS, mail and spam checks — server-only
    styles/       tokens.css, reset.css, base.css
    config.ts     site metadata, nav, footer, contact reasons, feeds
    content.ts    bio, projects, miniProjects
    types.ts      shared types
  routes/         pages, plus robots.txt and sitemap.xml
static/           served as-is
```

Homepage sections read from `content.ts` via `routes/+page.server.ts`, so
swapping in a real content source (markdown, CMS, API) only means changing that
`load`. Posts aren't stored here at all — they're merged from the RSS feeds in
`config.ts` at build time.

`sitemap.xml` is generated from the route tree, so a new page lists itself.

Design tokens live in `src/lib/styles/tokens.css` — colours, type scale, spacing,
radii, shadows, motion and z-index. Dark is the default; light is opt-in via a
`data-theme="light"` attribute on `<html>`.

## Fonts

Self-hosted, no third-party requests. Archivo and Hanken Grotesk come from
`@fontsource-variable`.

The wordmark uses **Chopic 3D Free Version** by Alit Design, subset to basic
Latin (`--font-wordmark`). Its licence is **freeware, non-commercial** — it is a
demo of a paid family and is not permitted for commercial use. Full version:
<https://alitdesign.net/product/chopic-comic-typeface/>
