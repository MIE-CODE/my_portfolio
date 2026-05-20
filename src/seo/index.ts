export { SITE } from "./site";
export { PAGE_SEO, blogPostSeo } from "./pages";
export {
  buildPageMetadata,
  buildArticleMetadata,
  buildRootMetadata,
  buildOgImageUrl,
} from "./buildMetadata";
export {
  personJsonLd,
  webSiteJsonLd,
  breadcrumbJsonLd,
  articleJsonLd,
  professionalServiceJsonLd,
} from "./jsonLd";
export type { PageSeoConfig, ArticleSeoConfig } from "./types";
