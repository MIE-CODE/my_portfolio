/** Open Graph / Twitter card dimensions (1.91:1 — LinkedIn, Facebook, X). */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_SIZE = {
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
} as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export type OgImageMetadata = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
};

export function buildOgImageMetadata(
  url: string,
  alt: string,
  options?: { type?: string },
): OgImageMetadata {
  return {
    url,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt,
    ...(options?.type ? { type: options.type } : {}),
  };
}
