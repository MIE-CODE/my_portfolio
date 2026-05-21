import { ImageResponse } from "@vercel/og";
import { OG_IMAGE_SIZE } from "@/src/seo/ogImage";
import { SITE } from "@/src/seo/site";

export const runtime = "edge";

const BG = "#0a1520";
const PANEL = "#141d2b";
const CYAN = "#4ee8ff";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

const INTER_BOLD =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-700-normal.woff";
const INTER_EXTRA_BOLD =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-800-normal.woff";

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function clampText(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

async function loadFonts() {
  const [bold, extraBold] = await Promise.all([
    fetch(INTER_BOLD).then((r) => r.arrayBuffer()),
    fetch(INTER_EXTRA_BOLD).then((r) => r.arrayBuffer()),
  ]);
  return { bold, extraBold };
}

/** Simple bold OG — optional ?title= & ?subtitle= & ?tagline= */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customTitle = searchParams.get("title")
      ? clampText(safeDecode(searchParams.get("title")!), 48)
      : null;
    const customSubtitle = searchParams.get("subtitle")
      ? clampText(safeDecode(searchParams.get("subtitle")!), 56)
      : null;
    const customTagline = searchParams.get("tagline")
      ? clampText(safeDecode(searchParams.get("tagline")!), 64)
      : null;

    const isDefault = !customTitle && !customSubtitle;
    const title = customTitle ?? SITE.person.fullName;
    const subtitle =
      customSubtitle ?? (isDefault ? SITE.ogImageSubtitle : SITE.person.jobTitle);
    const tagline = customTagline ?? SITE.tagline;
    const { bold, extraBold } = await loadFonts();

    const response = new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${BG} 0%, #0c1826 100%)`,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${CYAN} 0%, #1a5a8a 100%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            height: 200,
            borderRadius: 8,
            background: PANEL,
            border: `3px solid ${CYAN}`,
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: CYAN,
              letterSpacing: "-0.04em",
            }}
          >
            MIE
          </span>
        </div>

        <span
          style={{
            fontSize: isDefault ? 44 : 48,
            fontWeight: 800,
            color: TEXT,
            textAlign: "center",
            maxWidth: 1000,
            padding: "0 48px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: CYAN,
            marginTop: 16,
            textAlign: "center",
            maxWidth: 900,
            padding: "0 48px",
          }}
        >
          {subtitle}
        </span>

        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: MUTED,
            marginTop: 14,
            textAlign: "center",
            maxWidth: 900,
            padding: "0 48px",
          }}
        >
          {tagline}
        </span>
      </div>,
      {
        ...OG_IMAGE_SIZE,
        fonts: [
          { name: "Inter", data: bold, style: "normal", weight: 700 },
          { name: "Inter", data: extraBold, style: "normal", weight: 800 },
        ],
      },
    );

    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800",
    );
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("OG image error:", message);
    return new Response(`Failed to generate OG image: ${message}`, {
      status: 500,
    });
  }
}
