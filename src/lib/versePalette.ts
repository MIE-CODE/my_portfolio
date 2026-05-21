import type { ColorScheme } from "@/src/contexts/ThemeContext";

export type VersePalette = {
  space: {
    bgTop: string;
    bgMid: string;
    bgBottom: string;
    glow: string;
    glowOpacity: number;
  };
  canvas: {
    background: string;
    fog: string;
    fogNear: number;
    fogFar: number;
    overlay: string;
    hemiSky: string;
    hemiGround: string;
    hemiIntensity: number;
    starDrift: string;
    starDriftOpacity: number;
    sparkles: string;
    gridCell: string;
    gridSection: string;
    lights: { position: [number, number, number]; intensity: number; color: string }[];
  };
  hud: {
    cyan: string;
    amber: string;
    outline: string;
    panelBg: string;
  };
};

const VERSE_PALETTES: Record<ColorScheme, VersePalette> = {
  dark: {
    space: {
      bgTop: "#070a12",
      bgMid: "#0c1019",
      bgBottom: "#0a0d14",
      glow: "rgba(91, 130, 168, 0.28)",
      glowOpacity: 0.6,
    },
    canvas: {
      background: "#020408",
      fog: "#020408",
      fogNear: 45,
      fogFar: 320,
      overlay: "rgba(4, 8, 14, 0.28)",
      hemiSky: "#6a9fd4",
      hemiGround: "#0a0e18",
      hemiIntensity: 0.45,
      starDrift: "#8eb8e8",
      starDriftOpacity: 0.55,
      sparkles: "#4a7094",
      gridCell: "#1a2a3a",
      gridSection: "#2d4a62",
      lights: [
        { position: [0, 12, 8], intensity: 0.4, color: "#5b82a8" },
        { position: [-30, 6, -10], intensity: 0.25, color: "#8b7ec8" },
        { position: [35, 4, -20], intensity: 0.25, color: "#b38256" },
      ],
    },
    hud: {
      cyan: "#4ee8ff",
      amber: "#ffb347",
      outline: "#0a2030",
      panelBg: "#020810",
    },
  },
  light: {
    space: {
      bgTop: "#ecf2f8",
      bgMid: "#dce8f4",
      bgBottom: "#e8f0f8",
      glow: "rgba(26, 90, 138, 0.2)",
      glowOpacity: 0.85,
    },
    canvas: {
      background: "#dce8f4",
      fog: "#c5d8ea",
      fogNear: 55,
      fogFar: 280,
      overlay: "rgba(236, 242, 248, 0.42)",
      hemiSky: "#f4f8fc",
      hemiGround: "#b8d0e8",
      hemiIntensity: 0.65,
      starDrift: "#5a8ab8",
      starDriftOpacity: 0.35,
      sparkles: "#7aa8c8",
      gridCell: "#9eb8d4",
      gridSection: "#5a8ab0",
      lights: [
        { position: [0, 12, 8], intensity: 0.55, color: "#8eb8e8" },
        { position: [-30, 6, -10], intensity: 0.3, color: "#a8b8d8" },
        { position: [35, 4, -20], intensity: 0.28, color: "#c8a878" },
      ],
    },
    hud: {
      cyan: "#1a5a8a",
      amber: "#b47808",
      outline: "#dce8f4",
      panelBg: "#f0f6fc",
    },
  },
};

export function getVersePalette(scheme: ColorScheme): VersePalette {
  return VERSE_PALETTES[scheme];
}
