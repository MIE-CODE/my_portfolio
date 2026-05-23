import { SITE_SAME_AS } from "@/src/seo/identity";
import { SITE } from "@/src/seo/site";

/**
 * Identity links — favicons / apple-touch / manifest live in buildRootMetadata() only.
 * rel=me helps IndieWeb / Mastodon / GitHub verify profile ownership.
 */
export function SeoHeadLinks() {
  return (
    <>
      {SITE_SAME_AS.map((href) => (
        <link key={href} rel="me" href={href} />
      ))}
      <link rel="author" href={SITE.url} />
    </>
  );
}
