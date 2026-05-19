export type ScrollProfile =
  | "warp"
  | "drift"
  | "dive"
  | "orbit"
  | "scan"
  | "calm";

export type VerseSector = {
  label: string;
  scroll: ScrollProfile;
  camera: { x: number; y: number; scale: number; rotation: number };
  space3d: { x: number; y: number; z: number; rotY: number; rotX: number };
  nebula: { accent: string; secondary: string };
  hud: string;
};

const sectors: Record<string, VerseSector> = {
  "/": {
    label: "ORIGIN_SECTOR",
    scroll: "warp",
    camera: { x: 0, y: 0, scale: 1, rotation: 0 },
    space3d: { x: 0, y: 0, z: 0, rotY: 0, rotX: 0 },
    nebula: { accent: "rgba(91,130,168,0.45)", secondary: "rgba(179,130,86,0.35)" },
    hud: "LAT 6.5244° N · SECTOR HOME",
  },
  "/about": {
    label: "PROFILE_NEBULA",
    scroll: "orbit",
    camera: { x: -90, y: 50, scale: 1.08, rotation: -5 },
    space3d: { x: -14, y: 2, z: -12, rotY: 0.9, rotX: 0.15 },
    nebula: { accent: "rgba(120,90,200,0.4)", secondary: "rgba(91,130,168,0.3)" },
    hud: "BIO_SCAN · DEPTH 4,201u",
  },
  "/projects": {
    label: "BUILD_GRID",
    scroll: "drift",
    camera: { x: 120, y: -30, scale: 1.05, rotation: 4 },
    space3d: { x: 18, y: -3, z: -8, rotY: -0.7, rotX: 0.1 },
    nebula: { accent: "rgba(69,109,148,0.5)", secondary: "rgba(91,130,168,0.25)" },
    hud: "DEPLOY_LANE · 8 ACTIVE",
  },
  "/experience": {
    label: "TIMELINE_VOID",
    scroll: "dive",
    camera: { x: -40, y: -80, scale: 1.15, rotation: 2 },
    space3d: { x: 4, y: 12, z: -22, rotY: -0.5, rotX: -0.2 },
    nebula: { accent: "rgba(179,130,86,0.4)", secondary: "rgba(69,109,148,0.35)" },
    hud: "CHRONO_DRIFT · CTO TRACK",
  },
  "/services": {
    label: "SERVICE_ARRAY",
    scroll: "scan",
    camera: { x: -70, y: 20, scale: 1.1, rotation: -3 },
    space3d: { x: -16, y: -4, z: -14, rotY: 0.5, rotX: 0.08 },
    nebula: { accent: "rgba(91,130,168,0.5)", secondary: "rgba(120,160,120,0.3)" },
    hud: "MODULE_SCAN · 8 SERVICES",
  },
  "/blog": {
    label: "DATA_STREAM",
    scroll: "scan",
    camera: { x: 60, y: 40, scale: 1.06, rotation: 3 },
    space3d: { x: 10, y: 5, z: -18, rotY: 0.35, rotX: 0.12 },
    nebula: { accent: "rgba(100,140,200,0.45)", secondary: "rgba(91,130,168,0.3)" },
    hud: "LOG_BUFFER · READ MODE",
  },
  "/contact": {
    label: "COMMS_RELAY",
    scroll: "calm",
    camera: { x: 0, y: 60, scale: 1.02, rotation: 0 },
    space3d: { x: 0, y: 8, z: -6, rotY: 0.2, rotX: 0 },
    nebula: { accent: "rgba(91,130,168,0.35)", secondary: "rgba(179,130,86,0.25)" },
    hud: "OPEN_CHANNEL · PING OK",
  },
};

export const DEFAULT_SECTOR = sectors["/"];

export function getVerseSector(pathname: string): VerseSector {
  if (sectors[pathname]) return sectors[pathname];

  if (pathname.startsWith("/blog/")) return sectors["/blog"];
  if (pathname.startsWith("/blog")) return sectors["/blog"];
  if (pathname.startsWith("/projects")) return sectors["/projects"];
  if (pathname.startsWith("/experience")) return sectors["/experience"];

  return DEFAULT_SECTOR;
}

export function getRouteKey(pathname: string): string {
  if (sectors[pathname]) return pathname;
  if (pathname.startsWith("/blog")) return "/blog";
  return pathname;
}
