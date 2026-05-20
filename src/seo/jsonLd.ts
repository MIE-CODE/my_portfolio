import { SITE } from "./site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.person.fullName,
    alternateName: SITE.person.alternateName,
    givenName: SITE.person.givenName,
    familyName: SITE.person.familyName,
    jobTitle: SITE.person.jobTitle,
    description: SITE.defaultDescription,
    email: SITE.email,
    telephone: SITE.phone,
    url: SITE.url,
    image: `${SITE.url}${SITE.staticOgImage}`,
    sameAs: [SITE.linkedIn, SITE.github],
    knowsAbout: [
      "Next.js",
      "Nuxt",
      "React",
      "Vue",
      "TypeScript",
      "Tailwind CSS",
      "SaaS",
      "Fintech",
      "Paystack",
      "Performance Optimization",
      "Core Web Vitals",
      "Google Analytics",
      "PostHog",
      "GSAP",
      "Technical Leadership",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.shortName,
    url: SITE.url,
    description: SITE.defaultDescription,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}/#person` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
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
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.person.fullName,
    },
    publisher: {
      "@type": "Person",
      name: SITE.person.fullName,
      url: SITE.url,
    },
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
      "Full-stack and frontend engineering: Next.js, Nuxt, React, Vue, TypeScript, payments, analytics, and technical leadership.",
    areaServed: "Worldwide",
    email: SITE.email,
    founder: { "@id": `${SITE.url}/#person` },
  };
}
