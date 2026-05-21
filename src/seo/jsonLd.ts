import { SITE } from "./site";

/** Person — Google knowledge panel & name/alias mapping */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.person.fullName,
    alternateName: [...SITE.person.alternateName],
    url: SITE.url,
    email: SITE.email,
    jobTitle: SITE.person.jobTitle,
    description:
      "Senior Software Engineer and CTO with 5+ years building scalable web applications in fintech, healthcare, and AI. Founder of Blivap, a blood donation platform.",
    sameAs: [SITE.github, SITE.linkedIn, SITE.blivap],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "GraphQL",
      "Docker",
      "AWS",
      "Jest",
      "Socket.io",
      "AI Integration",
      "Fintech",
      "Healthcare Platforms",
      "System Design",
      "Blood Donation Technology",
      "Nuxt.js",
    ],
    worksFor: {
      "@type": "Organization",
      name: SITE.organizations.belsoft,
    },
    founder: {
      "@type": "Organization",
      name: "Blivap",
      url: SITE.blivap,
      description:
        "A blood donation and real-time donor-recipient matching platform",
    },
  };
}

/** WebSite — sitelinks & site entity */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: "Israel Enyo Menyaga — Portfolio",
    alternateName: "MIE Portfolio",
    url: SITE.url,
    description: SITE.defaultDescription,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}/#person` },
  };
}

/** Blivap product — links product searches to Israel */
export function blivapSoftwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.blivap}#application`,
    name: "Blivap",
    url: SITE.blivap,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "A real-time blood donation and donor-recipient matching platform built by Israel Enyo Menyaga.",
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.person.fullName,
      alternateName: "MIE",
      url: SITE.url,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  path: string;
}) {
  const url = `${SITE.url}${post.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@type": "Person", "@id": `${SITE.url}/#person`, name: SITE.person.fullName },
    publisher: { "@type": "Person", name: SITE.person.fullName, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    inLanguage: SITE.language,
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.person.fullName} — Software Engineering`,
    url: `${SITE.url}/services`,
    description:
      "Senior software engineering: React, Next.js, TypeScript, NestJS, AI integration, fintech, and healthcare platforms.",
    areaServed: "Worldwide",
    email: SITE.email,
    founder: { "@id": `${SITE.url}/#person` },
  };
}

/** Injected once in root layout <head> */
export function rootJsonLdGraph() {
  return [personJsonLd(), webSiteJsonLd(), blivapSoftwareJsonLd()];
}
