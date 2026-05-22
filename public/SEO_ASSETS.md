# Open Graph image

## Files

| File | Purpose |
|------|---------|
| `og-image.svg` | Source design (1200×630) — simple MIE logo mark |
| `og-image.png` | Generated PNG **1200×630** for LinkedIn, Facebook, Slack (run `yarn og:generate`) |
| `/api/og` | Dynamic OG **1200×630** (`?title=`, `?subtitle=`, `?tagline=`) — exports `size` + `contentType` |

## Regenerate PNG after editing the SVG

```bash
yarn og:generate
```

`yarn build` runs this automatically before `next build`.

## Preview

- Static: http://localhost:3000/og-image.svg
- PNG: http://localhost:3000/og-image.png
- Dynamic: http://localhost:3000/api/og (PNG, 1200×630)

Metadata (`buildMetadata`) emits `og:image:width` / `og:image:height` (1200 / 630) for Open Graph and Twitter on every page.

## PWA / app icons

| File | Purpose |
|------|---------|
| `web-app-manifest-192x192.png` | Manifest + metadata icon (192×192) |
| `web-app-manifest-512x512.png` | Manifest + metadata icon (512×512, maskable) |
| `site.webmanifest` | Lists SVG + PNG icons (see `SeoHeadLinks`, `buildMetadata`) |

## Identity (Google & social)

- **JSON-LD `@graph`** in root layout: `Person`, `WebSite`, `ProfilePage`, `Blivap` — linked by `@id`
- **`rel=me`** on GitHub, LinkedIn, Twitter, Blivap (`SeoHeadLinks.tsx`)
- **`/humans.txt`** — human-readable contact + profile URLs
- **Verification** (optional): set `GOOGLE_SITE_VERIFICATION` and/or `BING_SITE_VERIFICATION` in env before deploy

After deploy: [Google Search Console](https://search.google.com/search-console) → add property `israelm.site` → paste verification code into env → rebuild.
