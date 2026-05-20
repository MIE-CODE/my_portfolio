import type { ArticleSeoConfig, PageSeoConfig } from "./types";

export const PAGE_SEO = {
  home: {
    title: "Israel Enyo Menyaga — Senior Software Engineer & CTO",
    description:
      "Portfolio of Israel Menyaga: Senior Software Engineer, CTO at Belsoft Systems. Production SaaS with Next.js, Nuxt, React, Vue, and TypeScript—fintech, bill pay, HR tech, and healthcare platforms.",
    path: "/",
    absoluteTitle: true,
    og: {
      imageTitle: "Israel Enyo Menyaga",
      imageSubtitle: "Senior Software Engineer & CTO",
      imageTagline: "Next.js · Nuxt · React · TypeScript · SaaS",
    },
  } satisfies PageSeoConfig,

  about: {
    title: "About",
    description:
      "About Israel Menyaga—Senior Software Engineer, CTO (Technical Leadership) at Belsoft Systems, senior frontend engineer at True Perk and SparkPay, and senior software engineer at Blivap. Download CV and explore experience.",
    path: "/about",
    keywords: [
      "About Israel Menyaga",
      "Software Engineer CV",
      "CTO Belsoft",
      "True Perk",
      "SparkPay",
      "Blivap",
    ],
    og: {
      imageTitle: "About Israel Menyaga",
      imageSubtitle: "Senior Software Engineer",
      imageTagline: "Résumé · Experience · Stack",
    },
  } satisfies PageSeoConfig,

  services: {
    title: "Services",
    description:
      "Engineering services: Next.js and Nuxt SaaS, React and Vue enterprise UIs, payments and auth (Paystack, sessions, REST APIs), performance tuning, analytics (GA, PostHog, HubSpot), GSAP motion, and CTO-style technical leadership.",
    path: "/services",
    keywords: [
      "Next.js Development Services",
      "Nuxt Development",
      "CTO Consulting",
      "SaaS Engineering",
      "Paystack Integration",
      "Performance Optimization",
      "Figma to Code",
    ],
    og: {
      imageTitle: "Engineering Services",
      imageSubtitle: "Product delivery & technical leadership",
      imageTagline: "Next.js · Nuxt · Payments · Analytics",
    },
  } satisfies PageSeoConfig,

  experience: {
    title: "Experience",
    description:
      "Work history of Israel Menyaga: CTO at Belsoft Systems (BelCore, BelPower, BelAI), Senior Frontend Engineer at True Perk and SparkPay, Senior Software Engineer at Blivap. Timeline aligned with CV.",
    path: "/experience",
    keywords: [
      "Israel Menyaga Experience",
      "CTO Belsoft Systems",
      "True Perk Engineer",
      "SparkPay Frontend",
      "Blivap Software Engineer",
    ],
    og: {
      imageTitle: "Work Experience",
      imageSubtitle: "CTO · Senior Frontend · Full Stack",
      imageTagline: "Belsoft · True Perk · SparkPay · Blivap",
    },
  } satisfies PageSeoConfig,

  projects: {
    title: "Projects",
    description:
      "Selected projects: True Perk (Nuxt), SparkPay (Next.js), Blivap healthcare marketplace, BelCore collaboration, BelPower bill payments, Flyverge, and more—frontend and full-stack case studies.",
    path: "/projects",
    keywords: [
      "Israel Menyaga Projects",
      "True Perk Nuxt",
      "BelPower",
      "BelCore",
      "SparkPay Next.js",
      "Blivap",
      "Portfolio Projects",
    ],
    og: {
      imageTitle: "Projects & Case Studies",
      imageSubtitle: "Shipped SaaS & product work",
      imageTagline: "Fintech · HR · Healthcare · Collaboration",
    },
  } satisfies PageSeoConfig,

  blog: {
    title: "Blog",
    description:
      "Articles and tutorials on Next.js, React, TypeScript, Nuxt, performance, analytics, GSAP motion, and production web development—from Israel Menyaga.",
    path: "/blog",
    keywords: [
      "Web Development Blog",
      "Next.js Tutorials",
      "React Articles",
      "TypeScript Guides",
      "Performance Optimization",
    ],
    og: {
      imageTitle: "Tech Blog",
      imageSubtitle: "Tutorials & engineering notes",
      imageTagline: "Next.js · React · TypeScript · UX",
    },
  } satisfies PageSeoConfig,

  contact: {
    title: "Contact",
    description:
      "Contact Israel Menyaga for freelance projects, technical consulting, or full-stack engineering. Email, phone, and project inquiries welcome.",
    path: "/contact",
    keywords: [
      "Hire Israel Menyaga",
      "Freelance Developer",
      "Contact Software Engineer",
      "Next.js Consultant",
    ],
    og: {
      imageTitle: "Let's Work Together",
      imageSubtitle: "Contact Israel Menyaga",
      imageTagline: "Freelance · Consulting · Full-stack",
    },
  } satisfies PageSeoConfig,

  notFound: {
    title: "Page Not Found",
    description:
      "The page you requested could not be found on Israel Menyaga's portfolio. Return home or explore projects, services, and contact.",
    path: "/404",
    noIndex: true,
    og: {
      imageTitle: "404 — Page Not Found",
      imageSubtitle: "Israel Menyaga Portfolio",
      imageTagline: "Return home or browse projects",
    },
  } satisfies PageSeoConfig,
} as const;

export function blogIndexSeo(): PageSeoConfig {
  return PAGE_SEO.blog;
}

export function blogPostSeo(post: {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}): ArticleSeoConfig {
  return {
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.id}`,
    ogType: "article",
    keywords: [post.category, "Web Development", "Israel Menyaga Blog", post.title],
    og: {
      imageTitle: post.title,
      imageSubtitle: post.category,
      imageTagline: "Israel Menyaga · Engineering Blog",
    },
    article: {
      publishedTime: new Date(post.date).toISOString(),
      section: post.category,
      tags: [post.category, "Web Development"],
    },
  };
}
