import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const ogSize = { width: 1200, height: 630 };

const PRIMARY = "#5b82a8";
const PRIMARY_DARK = "#3a5c80";
const ACCENT = "#b38256";
const BG = "#0f1218";
const BG_CARD = "rgba(255,255,255,0.04)";

const INTER_REGULAR =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-400-normal.woff";
const INTER_BOLD =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-700-normal.woff";

const DEFAULT_TITLE = "Israel Enyo Menyaga";
const DEFAULT_SUBTITLE = "CTO & Full Stack Engineer";
const DEFAULT_TAGLINE = "Next.js · Nuxt · React · TypeScript · SaaS";

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

async function loadInterFonts(): Promise<{
  regular: ArrayBuffer;
  bold: ArrayBuffer;
}> {
  const [regular, bold] = await Promise.all([
    fetch(INTER_REGULAR).then((res) => {
      if (!res.ok) throw new Error("Inter regular font failed to load");
      return res.arrayBuffer();
    }),
    fetch(INTER_BOLD).then((res) => {
      if (!res.ok) throw new Error("Inter bold font failed to load");
      return res.arrayBuffer();
    }),
  ]);
  return { regular, bold };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = clampText(
      searchParams.get("title")
        ? safeDecode(searchParams.get("title")!)
        : DEFAULT_TITLE,
      56,
    );
    const subtitle = clampText(
      searchParams.get("subtitle")
        ? safeDecode(searchParams.get("subtitle")!)
        : DEFAULT_SUBTITLE,
      72,
    );
    const tagline = clampText(
      searchParams.get("tagline")
        ? safeDecode(searchParams.get("tagline")!)
        : DEFAULT_TAGLINE,
      80,
    );

    const { regular, bold } = await loadInterFonts();

    return new ImageResponse(
      <div
        tw="flex w-full h-full flex-col relative overflow-hidden"
        style={{ background: BG }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PRIMARY}55 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}44 0%, transparent 70%)`,
          }}
        />

        {/* Top accent */}
        <div
          style={{
            height: 6,
            width: "100%",
            background: `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 50%, ${ACCENT} 100%)`,
          }}
        />

        <div
          tw="flex flex-1 flex-col justify-between px-16 py-12"
          style={{ position: "relative" }}
        >
          {/* Header row */}
          <div tw="flex flex-row items-center justify-between w-full">
            <div tw="flex flex-row items-center">
              <div
                tw="flex items-center justify-center"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                  boxShadow: `0 12px 40px ${PRIMARY}66`,
                  fontFamily: "Inter",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                }}
              >
                MIE
              </div>
              <span
                style={{
                  marginLeft: 20,
                  fontFamily: "Inter",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Portfolio
              </span>
            </div>

            <div
              tw="flex flex-row"
              style={{
                gap: 10,
                padding: "10px 18px",
                borderRadius: 999,
                background: BG_CARD,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 18,
                  color: PRIMARY,
                  fontWeight: 700,
                }}
              >
                ●
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 400,
                }}
              >
                Open to work
              </span>
            </div>
          </div>

          {/* Main copy */}
          <div tw="flex flex-col" style={{ marginTop: 8 }}>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 64,
                fontWeight: 700,
                color: "#faf9f7",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                maxWidth: 1000,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 32,
                fontWeight: 700,
                color: PRIMARY,
                marginTop: 20,
                letterSpacing: "-0.02em",
              }}
            >
              {subtitle}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 22,
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                marginTop: 16,
                letterSpacing: "0.01em",
              }}
            >
              {tagline}
            </span>
          </div>

          {/* Footer pills */}
          <div tw="flex flex-row items-center justify-between w-full">
            <div tw="flex flex-row" style={{ gap: 12 }}>
              {["SaaS", "Fintech", "Leadership"].map((pill) => (
                <div
                  key={pill}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    background: BG_CARD,
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "Inter",
                    fontSize: 18,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 20,
                color: "rgba(255,255,255,0.35)",
                fontWeight: 400,
              }}
            >
              www.israelm.site
            </span>
          </div>
        </div>
      </div>,
      {
        ...ogSize,
        fonts: [
          {
            name: "Inter",
            data: regular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: bold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("OG image error:", message);
    return new Response(`Failed to generate OG image: ${message}`, {
      status: 500,
    });
  }
}
