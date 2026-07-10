import { absoluteAssetUrl, SEO_IDS, SITE_SAME_AS } from "./identity";
import { SITE } from "./site";

const PERSON_ID = SEO_IDS.person;
const WEBSITE_ID = SEO_IDS.website;
const OG_IMAGE_URL = absoluteAssetUrl(SITE.ogImage);
const PERSON_IMAGE_URL = absoluteAssetUrl(SITE.personImage);

type SchemaNode = Record<string, unknown>;

function stripContext(node: SchemaNode): SchemaNode {
  const copy = { ...node };
  delete copy["@context"];
  return copy;
}

/** Wrap nodes in a linked @graph (preferred by Google for entity relationships). */
export function schemaGraph(nodes: SchemaNode[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(stripContext),
  };
}

/**
 * Person — tells Google who this site belongs to (knowledge panel / sameAs graph).
 * Core fields match Schema.org Person: name, jobTitle, url, image, sameAs.
 */
export function personJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.person.fullName,
    givenName: SITE.person.givenName,
    additionalName: SITE.person.additionalName,
    familyName: SITE.person.familyName,
    alternateName: [...SITE.alternateNames, ...SITE.person.alternateName],
    jobTitle: SITE.person.jobTitle,
    url: SITE.url,
    image: {
      "@type": "ImageObject",
      url: PERSON_IMAGE_URL,
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
      caption: SITE.ogImageAlt,
    },
    sameAs: [...SITE_SAME_AS],
    mainEntityOfPage: { "@id": SEO_IDS.profilePage },
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    description: SITE.defaultDescription,
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
    hasOccupation: {
      "@type": "Occupation",
      name: SITE.person.jobTitle,
      occupationalCategory: "Software Developer",
      skills: "React, Next.js, TypeScript, NestJS, AI integration",
    },
    homeLocation: {
      "@type": "Place",
      name: "Nigeria",
      description: SITE.location,
    },
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

/** WebSite — sitelinks, publisher, explicit link to the person entity */
export function webSiteJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Israel Enyo Menyaga (MIE) — Portfolio",
    alternateName: [...SITE.alternateNames, "MIE Portfolio"],
    url: SITE.url,
    description: SITE.defaultDescription,
    inLanguage: SITE.language,
    about: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    image: OG_IMAGE_URL,
  };
}

/** Homepage — tells crawlers this URL is your primary profile */
export function profilePageJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": SEO_IDS.profilePage,
    url: SITE.url,
    name: SITE.defaultTitle,
    description: SITE.defaultDescription,
    inLanguage: SITE.language,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG_IMAGE_URL,
      width: SITE.ogImageWidth,
      height: SITE.ogImageHeight,
    },
  };
}

const ABOUT_PAGE_DESCRIPTION =
  "About Israel Enyo Menyaga (MIE)—Senior Software Engineer & CTO with 5+ years in React, Next.js, TypeScript, AI, fintech & healthcare. Founder of Blivap.";

/** About page — biography URL tied to the same Person @id */
export function aboutPageJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE.url}/about#webpage`,
    url: `${SITE.url}/about`,
    name: "About Israel Enyo Menyaga (MIE)",
    description: ABOUT_PAGE_DESCRIPTION,
    inLanguage: SITE.language,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

/** Blivap product — links product searches to Israel */
export function blivapSoftwareJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SEO_IDS.blivapApp,
    name: "Blivap",
    url: SITE.blivap,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "A real-time blood donation and donor-recipient matching platform built by Israel Enyo Menyaga.",
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
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
    author: { "@type": "Person", "@id": PERSON_ID, name: SITE.person.fullName, url: SITE.url },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.person.fullName,
      url: SITE.url,
      image: OG_IMAGE_URL,
    },
    image: OG_IMAGE_URL,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    inLanguage: SITE.language,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function professionalServiceJsonLd(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/services#service`,
    name: `${SITE.person.fullName} — Software Engineering`,
    url: `${SITE.url}/services`,
    description:
      "Senior software engineering: React, Next.js, TypeScript, NestJS, AI integration, fintech, and healthcare platforms.",
    areaServed: "Worldwide",
    email: SITE.email,
    telephone: SITE.phone,
    provider: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    image: OG_IMAGE_URL,
  };
}

/** Linked entity graph injected once in root layout */
export function rootJsonLdGraph(): SchemaNode {
  return schemaGraph([
    personJsonLd(),
    webSiteJsonLd(),
    profilePageJsonLd(),
    blivapSoftwareJsonLd(),
  ]);
}
