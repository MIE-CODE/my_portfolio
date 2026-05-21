/**
 * Renders public/og-image.svg → og-image.png (1200×630).
 * Dimensions must match src/seo/ogImage.ts.
 * Run: yarn og:generate
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const outPath = path.join(publicDir, "og-image.png");

await sharp(path.join(publicDir, "og-image.svg"))
  .resize(OG_WIDTH, OG_HEIGHT)
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(outPath);

const { width, height } = await sharp(outPath).metadata();
if (width !== OG_WIDTH || height !== OG_HEIGHT) {
  throw new Error(
    `og-image.png size mismatch: expected ${OG_WIDTH}×${OG_HEIGHT}, got ${width}×${height}`,
  );
}

console.log(`Wrote public/og-image.png (${width}×${height})`);
