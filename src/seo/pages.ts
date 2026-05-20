import type { ArticleSeoConfig, PageSeoConfig } from "./types";
import { SITE } from "./site";

const ROOT_DESC = SITE.defaultDescription;

export const PAGE_SEO = {
  home: {
    title: SITE.defaultTitle,
    description: ROOT_DESC,
    path: "/",
    absoluteTitle: true,
    og: {
      title: SITE.defaultTitle,
      description: ROOT_DESC,
      imageTitle: "Israel Enyo Menyaga (MIE)",
      imageSubtitle: "Senior Software Engineer & CTO",
      imageTagline: SITE.tagline,
    },
  } satisfies PageSeoConfig,

  about: {
    title: "About Israel Enyo Menyaga (MIE)",
    description:
      "About Israel Enyo Menyaga (MIE)—Senior Software Engineer & CTO with 5+ years in React, Next.js, TypeScript, AI, fintech & healthcare. Founder of Blivap. Based in Nigeria, remote worldwide.",
    path: "/about",
    keywords: ["About MIE developer", "Israel Menyaga biography", "Blivap founder about"],
    og: {
      imageTitle: "About Israel Enyo Menyaga",
      imageSubtitle: "MIE · MIE-CODE on GitHub",
      imageTagline: "Senior Engineer & CTO",
    },
  } satisfies PageSeoConfig,

  services: {
    title: "Services — React, Next.js & AI Engineering",
    description:
      "Engineering services by Israel Enyo Menyaga (MIE): SaaS with Next.js/Nuxt, AI integration, fintech & healthcare UIs, NestJS APIs, performance, and technical leadership for Belsoft-scale products.",
    path: "/services",
    og: {
      imageTitle: "Engineering Services",
      imageSubtitle: "Israel Enyo Menyaga (MIE)",
      imageTagline: "React · Next.js · AI · Fintech",
    },
  } satisfies PageSeoConfig,

  experience: {
    title: "Experience — Israel Enyo Menyaga (MIE)",
    description:
      "Work history: Belsoft Systems (CTO), Truperk Senior Frontend Engineer, SparkPay, Blivap founder & engineer. 5+ years shipping React, Next.js, TypeScript production apps.",
    path: "/experience",
    og: {
      imageTitle: "Work Experience",
      imageSubtitle: "Israel Enyo Menyaga",
      imageTagline: "Belsoft · Truperk · Blivap",
    },
  } satisfies PageSeoConfig,

  projects: {
    title: "Projects — Israel Enyo Menyaga (MIE)",
    description:
      "Portfolio projects by Israel Enyo Menyaga (MIE): Blivap blood donation platform, BelCore, BelPower, True Perk, SparkPay, and more—React, Next.js, Nuxt, NestJS, TypeScript.",
    path: "/projects",
    og: {
      imageTitle: "Projects Portfolio",
      imageSubtitle: "Built by MIE (Israel Menyaga)",
      imageTagline: "Healthcare · Fintech · SaaS",
    },
  } satisfies PageSeoConfig,

  blivap: {
    title: "Blivap — Blood Donation Platform | Built by Israel Enyo Menyaga (MIE)",
    description:
      "Blivap (blivap.com) by Israel Enyo Menyaga (MIE): real-time donor-recipient blood matching, Next.js & NestJS, AI-driven screening—founded and engineered in Nigeria.",
    path: "/projects/blivap",
    absoluteTitle: true,
    keywords: [
      "Blivap",
      "Blivap Israel Menyaga",
      "blood donation platform",
      "blivap.com",
      "MIE Blivap founder",
    ],
    og: {
      title: "Blivap — Blood Donation Platform | Israel Enyo Menyaga (MIE)",
      description:
        "Blivap (blivap.com) by Israel Enyo Menyaga (MIE): real-time donor-recipient matching, Next.js, NestJS & AI screening.",
      imageTitle: "Blivap",
      imageSubtitle: "By Israel Enyo Menyaga (MIE)",
      imageTagline: "Blood donation · Healthcare · Nigeria",
    },
  } satisfies PageSeoConfig,

  blog: {
    title: "Blog — Israel Enyo Menyaga (MIE)",
    description:
      "Technical articles by Israel Enyo Menyaga (MIE) on Next.js, React, TypeScript, AI integration, performance, and lessons from fintech & healthcare product work.",
    path: "/blog",
    og: {
      imageTitle: "MIE Engineering Blog",
      imageSubtitle: "Israel Enyo Menyaga",
      imageTagline: "Next.js · React · TypeScript",
    },
  } satisfies PageSeoConfig,

  contact: {
    title: "Contact Israel Enyo Menyaga (MIE)",
    description:
      "Contact Israel Enyo Menyaga (MIE) for engineering work—freelance, contract, or full-stack roles. Email israelmenyaga@gmail.com. React, Next.js, AI, fintech, healthcare.",
    path: "/contact",
    og: {
      imageTitle: "Contact MIE",
      imageSubtitle: "Israel Enyo Menyaga",
      imageTagline: "Remote · Nigeria · Worldwide",
    },
  } satisfies PageSeoConfig,

  notFound: {
    title: "Page Not Found",
    description: "Page not found on Israel Enyo Menyaga (MIE) portfolio. Explore projects including Blivap or contact Israel Menyaga.",
    path: "/404",
    noIndex: true,
  } satisfies PageSeoConfig,
} as const;

export function blogPostSeo(post: {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}): ArticleSeoConfig {
  return {
    title: `${post.title} | Israel Enyo Menyaga (MIE)`,
    description: post.excerpt,
    path: `/blog/${post.id}`,
    ogType: "article",
    keywords: [post.category, "MIE blog", "Israel Menyaga", post.title],
    og: {
      imageTitle: post.title,
      imageSubtitle: "By Israel Enyo Menyaga (MIE)",
      imageTagline: post.category,
    },
    article: {
      publishedTime: new Date(post.date).toISOString(),
      section: post.category,
      tags: [post.category, "Web Development", "MIE"],
    },
  };
}
