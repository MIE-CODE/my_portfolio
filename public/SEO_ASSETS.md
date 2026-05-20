# SEO assets checklist

## Required: Open Graph image

Create **`public/og-image.png`** at **1200×630px**.

Suggested content:
- Name: **Israel Enyo Menyaga (MIE)**
- Subtitle: Senior Software Engineer & CTO
- Tags: React · Next.js · Blivap
- Brand colors from the portfolio (primary `#5b82a8`)

Until this file exists, social previews fall back to `/api/og` (dynamic) and `/og-image.svg`.

## Optional: Blivap-specific OG

Add **`public/projects/blivap-og.png`** (1200×630) and set `ogImage` on `PAGE_SEO.blivap` in `src/seo/pages.ts`.

## Verify after deploy

1. [Google Rich Results Test](https://search.google.com/test/rich-results) — Person + WebSite + SoftwareApplication
2. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — OG image
3. Submit `https://israelm.site/sitemap.xml` in Google Search Console
