/**
 * Renders public/og-image.svg → og-image.png (1200×630).
 * Icons live in public/ only (do not add app/icon.svg — it breaks /icon.svg).
 * Run: yarn og:generate
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
await sharp(path.join(publicDir, "og-image.svg"))
  .resize(1200, 630)
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(path.join(publicDir, "og-image.png"));
console.log("Wrote public/og-image.png");

