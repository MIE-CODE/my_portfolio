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
      {/* Icons also served via app/icon.svg + metadata.icons; kept for manifest parity */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-icon.svg" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
