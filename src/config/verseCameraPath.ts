import { getRouteViewpoint } from "./verseCinematics";

export const VERSE_PATH_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/services",
  "/blog",
  "/contact",
] as const;

export type PathVec3 = { x: number; y: number; z: number };

export type PathSample = {
  camera: PathVec3;
  lookAt: PathVec3;
  fov: number;
  roll: number;
  landmarkId: string;
  tagline: string;
  viewpointId: string;
};

type PathWaypoint = {
  camera: PathVec3;
  lookAt: PathVec3;
  fov: number;
  roll: number;
  landmarkId: string;
  tagline: string;
  viewpointId: string;
};

let waypointsCache: PathWaypoint[] | null = null;

function getWaypoints(): PathWaypoint[] {
  if (waypointsCache) return waypointsCache;
  waypointsCache = VERSE_PATH_ROUTES.map((route) => {
    const v = getRouteViewpoint(route);
    return {
      camera: { ...v.camera },
      lookAt: { ...v.lookAt },
      fov: v.fov,
      roll: v.roll,
      landmarkId: v.landmarkId,
      tagline: v.tagline,
      viewpointId: v.id,
    };
  });
  return waypointsCache;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec(a: PathVec3, b: PathVec3, t: number): PathVec3 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) };
}

export function routeToPathIndex(pathname: string): number {
  const idx = VERSE_PATH_ROUTES.indexOf(pathname as (typeof VERSE_PATH_ROUTES)[number]);
  if (idx >= 0) return idx;
  if (pathname.startsWith("/blog")) return 5;
  return 0;
}

export function getWaypoint(index: number): PathSample {
  const wps = getWaypoints();
  const wp = wps[Math.max(0, Math.min(wps.length - 1, index))];
  return { ...wp };
}

/** Blend two world-space camera snapshots — no intermediate route indices */
export function blendPathSamples(from: PathSample, to: PathSample, t: number): PathSample {
  const e = Math.max(0, Math.min(1, t));
  const span =
    Math.hypot(
      to.camera.x - from.camera.x,
      to.camera.y - from.camera.y,
      to.camera.z - from.camera.z,
    ) || 1;
  const arc = Math.sin(e * Math.PI) * Math.min(2.5, span * 0.03);

  return {
    camera: {
      x: lerp(from.camera.x, to.camera.x, e),
      y: lerp(from.camera.y, to.camera.y, e) + arc,
      z: lerp(from.camera.z, to.camera.z, e),
    },
    lookAt: lerpVec(from.lookAt, to.lookAt, e),
    fov: lerp(from.fov, to.fov, e),
    roll: lerp(from.roll, to.roll, e),
    landmarkId: e < 0.94 ? from.landmarkId : to.landmarkId,
    tagline: e < 0.94 ? from.tagline : to.tagline,
    viewpointId: e < 0.94 ? from.viewpointId : to.viewpointId,
  };
}

export function sampleAtStop(stopIndex: number): PathSample {
  return getWaypoint(stopIndex);
}

export function flightDuration(from: PathSample, to: PathSample, reducedMotion: boolean): number {
  if (reducedMotion) return 0;
  const dist = Math.hypot(
    to.camera.x - from.camera.x,
    to.camera.y - from.camera.y,
    to.camera.z - from.camera.z,
  );
  const dur = 0.38 + dist * 0.024;
  return Math.min(Math.max(dur, 0.55), 2.6);
}

export function landmarkFocusStrengthFromCamera(
  camera: PathVec3,
  landmark: [number, number, number],
  isFlying = false,
): number {
  const dx = camera.x - landmark[0];
  const dy = camera.y - landmark[1];
  const dz = camera.z - landmark[2];
  const dist = Math.hypot(dx, dy, dz);
  let strength: number;
  if (dist < 38) strength = 0.85 + (38 - dist) * 0.008;
  else if (dist < 75) strength = 0.28 + (75 - dist) * 0.015;
  else strength = 0.24;

  if (isFlying) return Math.min(strength, 0.38);
  return strength;
}
