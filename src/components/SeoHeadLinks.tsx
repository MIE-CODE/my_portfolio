import { SITE_SAME_AS } from "@/src/seo/identity";
import { SITE } from "@/src/seo/site";

/**
 * Identity + icon links — complements Next.js Metadata (title, OG, JSON-LD).
 * rel=me helps IndieWeb / Mastodon / GitHub verify profile ownership.
 */
export function SeoHeadLinks() {
  return (
    <>
      {SITE_SAME_AS.map((href) => (
        <link key={href} rel="me" href={href} />
      ))}
      <link rel="author" href={SITE.url} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
      <link
        rel="icon"
        type="image/png"
        href={SITE.manifestIcon192}
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        href={SITE.manifestIcon512}
        sizes="512x512"
      />
      <link rel="apple-touch-icon" href="/apple-icon.svg" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
