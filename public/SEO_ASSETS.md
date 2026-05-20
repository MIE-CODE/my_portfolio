# Open Graph image

## Files

| File | Purpose |
|------|---------|
| `og-image.svg` | Source design (1200×630) — simple MIE logo mark |
| `og-image.png` | Generated PNG for LinkedIn, Facebook, Slack (run `yarn og:generate`) |
| `/api/og` | Dynamic OG for blog posts (`?title=` & `?subtitle=`) — same logo style |

## Regenerate PNG after editing the SVG

```bash
yarn og:generate
```

`yarn build` runs this automatically before `next build`.

## Preview

- Static: http://localhost:3000/og-image.svg
- PNG: http://localhost:3000/og-image.png
- Dynamic: http://localhost:3000/api/og
