/** Visual shift per chamber (vw) — stays on screen */
export const CHAMBER_STEP_VW = 8;

/** Visual shift per route (vw) */
export const ROUTE_STEP_VW = 6;

export type VersePart = {
  id: string;
  name: string;
  hud: string;
};

export type VerseZone = {
  label: string;
  routeIndex: number;
  parts: [VersePart, VersePart, VersePart];
};

function chamber(id: string, name: string, hud: string): VersePart {
  return { id, name, hud };
}

const zones: Record<string, VerseZone> = {
  "/": {
    label: "ORIGIN_SECTOR",
    routeIndex: 0,
    parts: [
      chamber("west", "NEBULA WING", "West chamber"),
      chamber("core", "SECTOR CORE", "Home coordinates"),
      chamber("east", "OUTER RIM", "East chamber"),
    ],
  },
  "/about": {
    label: "PROFILE_NEBULA",
    routeIndex: 1,
    parts: [
      chamber("archive", "MEMORY ARCHIVE", "Archive chamber"),
      chamber("core", "IDENTITY CORE", "Profile scan"),
      chamber("mesh", "SKILL MESH", "Skill mesh"),
    ],
  },
  "/projects": {
    label: "BUILD_GRID",
    routeIndex: 2,
    parts: [
      chamber("cache", "BUILD CACHE", "Build cache"),
      chamber("core", "SHIP LANE", "Active products"),
      chamber("edge", "EDGE NODE", "Live endpoints"),
    ],
  },
  "/experience": {
    label: "TIMELINE_VOID",
    routeIndex: 3,
    parts: [
      chamber("past", "CHRONO PAST", "Past roles"),
      chamber("core", "PRESENT ARC", "Leadership track"),
      chamber("future", "TRAJECTORY", "Next orbit"),
    ],
  },
  "/services": {
    label: "SERVICE_ARRAY",
    routeIndex: 4,
    parts: [
      chamber("stack", "STACK LAB", "Frameworks"),
      chamber("core", "SERVICE CORE", "Delivery modes"),
      chamber("growth", "GROWTH BUS", "Analytics"),
    ],
  },
  "/blog": {
    label: "DATA_STREAM",
    routeIndex: 5,
    parts: [
      chamber("buffer", "LOG BUFFER", "Drafts"),
      chamber("core", "STREAM CORE", "Published"),
      chamber("signal", "SIGNAL HUB", "Syndication"),
    ],
  },
  "/contact": {
    label: "COMMS_RELAY",
    routeIndex: 6,
    parts: [
      chamber("quiet", "QUIET BAND", "Low noise"),
      chamber("core", "OPEN CHANNEL", "Ping ok"),
      chamber("queue", "MESSAGE QUEUE", "Outbound"),
    ],
  },
};

export const DEFAULT_ZONE = zones["/"];

export function getVerseZone(pathname: string): VerseZone {
  if (zones[pathname]) return zones[pathname];
  if (pathname.startsWith("/blog")) return zones["/blog"];
  return DEFAULT_ZONE;
}

/** All motion in vw / px — clamped so background never leaves viewport */
export function getVerseTransform(
  zone: VerseZone,
  chamberIndex: number,
  scrollProgress: number,
) {
  const chamber = Math.max(0, Math.min(2, chamberIndex));
  const p = Math.max(0, Math.min(1, scrollProgress));

  const panX =
    zone.routeIndex * ROUTE_STEP_VW + (chamber - 1) * CHAMBER_STEP_VW;
  const depthPx = p * 32;
  const scale = 1 + p * 0.03;
  const rotate = (chamber - 1) * 0.4 + p * 0.8;

  return {
    panX,
    depthPx,
    scale,
    rotate,
    part: zone.parts[chamber],
  };
}

export function detectLowPower(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (cores <= 4 || (mem !== undefined && mem < 4)) return true;
  return false;
}
