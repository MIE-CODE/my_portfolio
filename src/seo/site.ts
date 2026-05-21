import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./ogImage";
import { STACK_TAGLINE } from "./stackSummary";

/**
 * Site-wide SEO constants — single source of truth for metadata, JSON-LD, and sitemap.
 * OG assets: `public/og-image.svg` + `og-image.png` (generated via `yarn og:generate`).
 */
export const SITE = {
  name: "Israel Enyo Menyaga",
  shortName: "Israel Enyo Menyaga",
  alternateNames: ["Israel Menyaga", "MIE", "MIE-CODE"] as const,
  /** Production site — canonical for sitemap, OG, JSON-LD, Search Console */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://israelm.site"
  ).replace(/\/$/, ""),
  locale: "en_US",
  language: "en",
  location: "Remote / Nigeria",
  /** ~155 characters — root & OG description */
  defaultDescription:
    "Israel Enyo Menyaga (MIE), Senior Software Engineer & CTO — full stack developer: React, Next.js, Node, NestJS, PostgreSQL, Docker, AI. Fintech & healthcare. Founder of Blivap.",
  defaultTitle: "Israel Enyo Menyaga (MIE) | Senior Software Engineer & CTO",
  /** Used on OG images and dynamic /api/og cards */
  tagline: STACK_TAGLINE,
  ogImageSubtitle: "Full Stack Developer",
  email: "israelmenyaga@gmail.com",
  phone: "+2349137437424",
  twitter: "@israelmenyaga",
  twitterHandle: "israelmenyaga",
  linkedIn: "https://www.linkedin.com/in/israelmenyaga",
  github: "https://github.com/MIE-CODE",
  twitterUrl: "https://twitter.com/israelmenyaga",
  blivap: "https://blivap.com",
  cvPath: "/cv/Israel_menyaga_cv.pdf",
  /** Primary static OG asset — 1200×630 PNG at public/og-image.png */
  ogImage: "/og-image.png",
  ogImageWidth: OG_IMAGE_WIDTH,
  ogImageHeight: OG_IMAGE_HEIGHT,
  ogImageAlt:
    "Israel Enyo Menyaga (MIE) — Full Stack Developer, Senior Software Engineer, CTO & Founder of Blivap",
  staticOgImageFallback: "/og-image.svg",
  twitterImage: "/og-image.png",
  themeColor: "#0a1520",
  person: {
    givenName: "Israel",
    additionalName: "Enyo",
    familyName: "Menyaga",
    fullName: "Israel Enyo Menyaga",
    alternateName: ["Israel Menyaga", "MIE", "MIE-CODE", "israelmenyaga"] as const,
    jobTitle: "Senior Software Engineer & CTO",
    role: "Senior Software Engineer & CTO",
  },
  organizations: {
    belsoft: "Belsoft Systems",
    truperk: "Truperk",
  },
  keywords: [
    "Israel Enyo Menyaga",
    "Israel Menyaga",
    "israelmenyaga",
    "MIE developer",
    "MIE software engineer",
    "MIE-CODE",
    "MIE coder",
    "Israel Menyaga developer",
    "Israel Menyaga software engineer",
    "Israel Menyaga CTO",
    "Israel Menyaga React developer",
    "Israel Menyaga Next.js",
    "Israel Enyo Menyaga engineer",
    "Blivap founder",
    "Blivap developer",
    "blivap.com creator",
    "blood donation platform developer",
    "Blivap Israel Menyaga",
    "Senior Frontend Engineer Nigeria",
    "React TypeScript developer Nigeria",
    "Next.js developer portfolio",
    "AI integration engineer",
    "Fintech frontend developer",
    "NestJS developer",
    "Full stack engineer Nigeria",
    "Belsoft Systems CTO",
    "Truperk engineer",
    "MIE portfolio",
  ],
} as const;
