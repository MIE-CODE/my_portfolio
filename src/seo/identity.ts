import { SITE } from "./site";

/** Absolute URLs for JSON-LD @id / sameAs / rel=me (single source of truth). */
export const SEO_IDS = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  profilePage: `${SITE.url}/#profilepage`,
  blivapApp: `${SITE.blivap}#application`,
} as const;

export function absoluteAssetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

/** Profiles crawlers use to verify you are the same person across the web. */
export const SITE_SAME_AS = [
  SITE.github,
  SITE.linkedIn,
  SITE.twitterUrl,
  SITE.blivap,
] as const;

export function buildSiteVerification(): {
  google?: string | string[];
  yandex?: string | string[];
  other?: Record<string, string | number | (string | number)[]>;
} {
  const google =
    process.env.GOOGLE_SITE_VERIFICATION ??
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing =
    process.env.BING_SITE_VERIFICATION ??
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const yandex =
    process.env.YANDEX_SITE_VERIFICATION ??
    process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION;

  const verification: ReturnType<typeof buildSiteVerification> = {};
  if (google) verification.google = google;
  if (bing) {
    verification.other = {
      ...verification.other,
      "msvalidate.01": bing,
    };
  }
  if (yandex) verification.yandex = yandex;
  return verification;
}
