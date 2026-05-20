import { SITE } from "@/src/seo/site";

/**
 * rel=me + icons — rendered in document; Next.js Metadata API handles title/OG/meta.
 * Kept as link elements because multiple rel=me URLs are not in the Metadata type.
 */
export function SeoHeadLinks() {
  return (
    <>
      <link rel="me" href={SITE.github} />
      <link rel="me" href={SITE.linkedIn} />
      <link rel="me" href={SITE.blivap} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.svg" />
      <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.svg" />
      <link rel="apple-touch-icon" href="/apple-icon.svg" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
