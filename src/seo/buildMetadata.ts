import type { Metadata } from "next";
import { SITE } from "./site";
import type { ArticleSeoConfig, PageSeoConfig } from "./types";

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

/** Dynamic OG image via `/api/og` (1200×630). */
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
  const merged = [...SITE.keywords, ...(pageKeywords ?? [])];
  return Array.from(new Set(merged));
}

function resolveTitle(config: PageSeoConfig): Metadata["title"] {
  if (config.absoluteTitle) {
    return { absolute: config.title };
  }
  return config.title;
}

function buildSharedMetadata(config: PageSeoConfig): Metadata {
  const ogTitle = config.og?.title ?? config.title;
  const ogDescription = config.og?.description ?? config.description;
  const ogImageTitle =
    config.og?.imageTitle ?? (config.absoluteTitle ? SITE.person.fullName : ogTitle);
  const ogImageUrl = buildOgImageUrl({
    title: ogImageTitle,
    subtitle: config.og?.imageSubtitle ?? SITE.person.role,
    tagline: config.og?.imageTagline ?? SITE.tagline,
  });

  const canonicalPath = config.path === "/404" ? undefined : config.path;

  return {
    title: resolveTitle(config),
    description: config.description,
    keywords: mergeKeywords(config.keywords),
    authors: [{ name: SITE.person.fullName, url: SITE.url }],
    creator: SITE.person.fullName,
    publisher: SITE.person.fullName,
    alternates: canonicalPath
      ? { canonical: canonicalPath }
      : undefined,
    openGraph: {
      type: config.ogType ?? "website",
      locale: SITE.locale,
      url: absoluteUrl(config.path),
      siteName: SITE.shortName,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${ogTitle} — ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
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

/** Per-page metadata — use in `export const metadata` or `generateMetadata`. */
export function buildPageMetadata(config: PageSeoConfig): Metadata {
  return buildSharedMetadata(config);
}

/** Blog post metadata with `article` Open Graph fields. */
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

/** Root layout defaults — merged with every route. */
export function buildRootMetadata(): Metadata {
  const homeOg = buildOgImageUrl({
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
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: SITE.url,
      siteName: SITE.shortName,
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      images: [
        {
          url: homeOg,
          width: 1200,
          height: 630,
          alt: `${SITE.person.fullName} — ${SITE.person.role}`,
        },
        {
          url: SITE.staticOgImage,
          width: 1200,
          height: 630,
          alt: SITE.person.fullName,
          type: "image/svg+xml",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      images: [homeOg, SITE.twitterImage],
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
    verification: {
      // google: "your-google-search-console-code",
    },
  };
}
