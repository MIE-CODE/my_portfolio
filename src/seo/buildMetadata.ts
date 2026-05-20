import type { Metadata } from "next";
import { SITE } from "./site";
import type {
  ArticleSeoConfig,
  GeneratePageMetadataInput,
  PageSeoConfig,
} from "./types";

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

export function buildOgImageUrl(params: {
  title: string;
  subtitle?: string;
  tagline?: string;
}): string {
  const search = new URLSearchParams({
    title: params.title,
    subtitle: params.subtitle ?? SITE.person.role,
    tagline: params.tagline ?? SITE.tagline,
  });
  return `/api/og?${search.toString()}`;
}

function mergeKeywords(pageKeywords?: string[]): string[] {
  return Array.from(new Set([...SITE.keywords, ...(pageKeywords ?? [])]));
}

function resolveTitle(config: PageSeoConfig): Metadata["title"] {
  if (config.absoluteTitle) return { absolute: config.title };
  return config.title;
}

function resolveOgImages(config: PageSeoConfig, ogTitle: string) {
  const alt = config.ogImageAlt ?? SITE.ogImageAlt;
  if (config.ogImage) {
    return [{ url: config.ogImage, width: 1200, height: 630, alt }];
  }
  const dynamic = buildOgImageUrl({
    title: config.og?.imageTitle ?? ogTitle,
    subtitle: config.og?.imageSubtitle ?? SITE.person.role,
    tagline: config.og?.imageTagline ?? SITE.tagline,
  });
  return [
    { url: SITE.ogImage, width: 1200, height: 630, alt },
    { url: dynamic, width: 1200, height: 630, alt },
    {
      url: SITE.staticOgImageFallback,
      width: 1200,
      height: 630,
      alt: SITE.person.fullName,
      type: "image/svg+xml",
    },
  ];
}

function buildSharedMetadata(config: PageSeoConfig): Metadata {
  const ogTitle = config.og?.title ?? config.title;
  const ogDescription = config.og?.description ?? config.description;
  const images = resolveOgImages(config, ogTitle);
  const primaryImage = images[0]?.url ?? SITE.ogImage;
  const canonicalPath = config.path === "/404" ? undefined : config.path;

  return {
    title: resolveTitle(config),
    description: config.description,
    keywords: mergeKeywords(config.keywords),
    authors: [{ name: SITE.person.fullName, url: SITE.url }],
    creator: SITE.person.fullName,
    publisher: SITE.person.fullName,
    alternates: canonicalPath ? { canonical: canonicalPath } : undefined,
    openGraph: {
      type: config.ogType ?? "website",
      locale: SITE.locale,
      url: absoluteUrl(config.path),
      siteName: SITE.shortName,
      title: ogTitle,
      description: ogDescription,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: ogTitle,
      description: ogDescription,
      images: [primaryImage],
    },
    robots: config.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildPageMetadata(config: PageSeoConfig): Metadata {
  return buildSharedMetadata(config);
}

/**
 * Reusable per-page SEO helper — merges page fields with site-wide defaults.
 */
export function generatePageMetadata(input: GeneratePageMetadataInput): Metadata {
  return buildPageMetadata({
    title: input.pageTitle,
    description: input.pageDescription,
    path: input.pagePath,
    keywords: input.keywords,
    ogImage: input.ogImage,
    ogImageAlt: input.ogImageAlt,
    absoluteTitle: input.absoluteTitle,
    noIndex: input.noIndex,
    og: input.og,
  });
}

export function buildArticleMetadata(config: ArticleSeoConfig): Metadata {
  const base = buildSharedMetadata(config);
  const { article } = config;
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime ?? article.publishedTime,
      authors: [SITE.person.fullName],
      section: article.section,
      tags: article.tags,
    },
  };
}

export function buildRootMetadata(): Metadata {
  const dynamicOg = buildOgImageUrl({
    title: SITE.person.fullName,
    subtitle: SITE.person.role,
    tagline: SITE.tagline,
  });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SITE.defaultTitle,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.defaultDescription,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.person.fullName, url: SITE.url }],
    creator: SITE.person.fullName,
    publisher: SITE.person.fullName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: SITE.url,
      siteName: SITE.shortName,
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: SITE.ogImageAlt,
        },
        { url: dynamicOg, width: 1200, height: 630, alt: SITE.ogImageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      images: [SITE.twitterImage],
      site: SITE.twitter,
      creator: SITE.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {},
  };
}
