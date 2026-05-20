/**
 * Renders public/og-image.svg → public/og-image.png (1200×630) for LinkedIn/Facebook.
 * Run: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "og-image.svg");
const pngPath = path.join(root, "public", "og-image.png");

await sharp(svgPath)
  .resize(1200, 630)
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(pngPath);

console.log("Wrote", pngPath);
