import { ImageResponse } from "@vercel/og";
import { SITE } from "@/src/seo/site";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

const PRIMARY = "#5b82a8";
const PRIMARY_DARK = "#3a5c80";
const BG = "#0c0f14";
const BG_TOP = "#141820";
const TEXT = "#e8e4dc";
const MUTED = "rgba(232, 228, 220, 0.55)";

const INTER_REGULAR =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-400-normal.woff";
const INTER_BOLD =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-700-normal.woff";

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
  const [regular, bold] = await Promise.all([
    fetch(INTER_REGULAR).then((r) => r.arrayBuffer()),
    fetch(INTER_BOLD).then((r) => r.arrayBuffer()),
  ]);
  return { regular, bold };
}

/** Simple logo OG — optional ?title= for blog/page-specific cards */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customTitle = searchParams.get("title")
      ? clampText(safeDecode(searchParams.get("title")!), 48)
      : null;
    const customSubtitle = searchParams.get("subtitle")
      ? clampText(safeDecode(searchParams.get("subtitle")!), 56)
      : null;

    const name = customTitle ?? SITE.person.fullName;
    const role = customSubtitle ?? SITE.person.jobTitle;
    const showMarkOnly = !customTitle && !customSubtitle;

    const { regular, bold } = await loadFonts();

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${BG_TOP} 0%, ${BG} 100%)`,
            position: "relative",
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: `linear-gradient(90deg, ${PRIMARY} 0%, #7eb8e8 50%, #b38256 100%)`,
            }}
          />

          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              width: 560,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${PRIMARY}33 0%, transparent 70%)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
            }}
          />

          {/* MIE logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              borderRadius: 44,
              background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
              border: "2px solid rgba(255,255,255,0.18)",
              boxShadow: `0 0 48px ${PRIMARY}55`,
              marginBottom: showMarkOnly ? 36 : 28,
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 72,
                fontWeight: 700,
                color: "#faf9f7",
                letterSpacing: "-0.04em",
              }}
            >
              MIE
            </span>
          </div>

          {/* Name + role (default or custom) */}
          <span
            style={{
              fontFamily: "Inter",
              fontSize: showMarkOnly ? 28 : 32,
              fontWeight: 600,
              color: TEXT,
              letterSpacing: "0.02em",
              textAlign: "center",
              maxWidth: 900,
              padding: "0 48px",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: "Inter",
              fontSize: 18,
              fontWeight: 400,
              color: MUTED,
              marginTop: 10,
              textAlign: "center",
              maxWidth: 800,
              padding: "0 48px",
            }}
          >
            {role}
          </span>

          {/* Domain */}
          <span
            style={{
              position: "absolute",
              bottom: 28,
              right: 40,
              fontFamily: "Inter",
              fontSize: 14,
              color: "rgba(232,228,220,0.35)",
            }}
          >
            israelm.site
          </span>
        </div>
      ),
      {
        ...SIZE,
        fonts: [
          { name: "Inter", data: regular, style: "normal", weight: 400 },
          { name: "Inter", data: bold, style: "normal", weight: 700 },
        ],
      },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("OG image error:", message);
    return new Response(`Failed to generate OG image: ${message}`, { status: 500 });
  }
}
