export type OgType = "website" | "article";

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: OgType;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Static image path under public/ or absolute URL */
  ogImage?: string;
  ogImageAlt?: string;
  og?: {
    title?: string;
    description?: string;
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

/** Input shape for `generatePageMetadata()` */
export type GeneratePageMetadataInput = {
  pageTitle: string;
  pageDescription: string;
  pagePath: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  og?: PageSeoConfig["og"];
};
