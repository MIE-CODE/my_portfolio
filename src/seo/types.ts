export type OgType = "website" | "article";

export type PageSeoConfig = {
  /** Browser tab / SERP title (site name appended via root template unless `absoluteTitle`) */
  title: string;
  description: string;
  /** Canonical path, e.g. `/about` */
  path: string;
  keywords?: string[];
  ogType?: OgType;
  /** Skip suffix template — use for home only */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Overrides for Open Graph / Twitter (defaults to title + description) */
  og?: {
    title?: string;
    description?: string;
    /** Rendered on dynamic `/api/og` image */
    imageTitle?: string;
    imageSubtitle?: string;
    imageTagline?: string;
  };
};

export type ArticleSeoConfig = PageSeoConfig & {
  ogType: "article";
  article: {
    publishedTime: string;
    modifiedTime?: string;
    section: string;
    tags?: string[];
  };
};
