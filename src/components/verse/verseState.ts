import { getRouteViewpoint } from "@/src/config/verseCinematics";
import {
  blendPathSamples,
  landmarkFocusStrengthFromCamera,
  sampleAtStop,
  VERSE_PATH_ROUTES,
  type PathSample,
} from "@/src/config/verseCameraPath";

export type { PathSample };

export const VERSE_LATERAL_MAX = 40;

export type VerseTarget = {
  pathname: string;
  pathAnchor: number;
  /** 0→1 flight progress; 1 = settled */
  travelT: number;
  flightStart: PathSample | null;
  flightEnd: PathSample | null;
  /** View/chamber config frozen for the duration of a flight */
  viewAnchor: number;
  panX: number;
  /** Horizontal scroll offset (−LATERAL_MAX … +LATERAL_MAX px) */
  lateralPx: number;
  depthPx: number;
  scale: number;
  rotate: number;
  routeIndex: number;
  chamberIndex: number;
};

export type VerseWorld = {
  camera: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov: number;
  roll: number;
  routeIndex: number;
  chamberIndex: number;
  pathAnchor: number;
  isFlying: boolean;
  viewpointId: string;
  focusLandmarkId: string;
  tagline: string;
};

function resolvePathSample(t: VerseTarget): PathSample {
  if (t.flightStart && t.flightEnd && t.travelT < 1) {
    return blendPathSamples(t.flightStart, t.flightEnd, t.travelT);
  }
  return sampleAtStop(t.pathAnchor);
}

/** Extract current world-space camera (exact visual position) */
export function worldSnapshotFromTarget(t: VerseTarget, metaIndex?: number): PathSample {
  const w = verseTargetToWorld(t);
  const meta = sampleAtStop(metaIndex ?? t.pathAnchor);
  return {
    camera: { x: w.camera.x, y: w.camera.y, z: w.camera.z },
    lookAt: { x: w.lookAt.x, y: w.lookAt.y, z: w.lookAt.z },
    fov: w.fov,
    roll: w.roll,
    landmarkId: meta.landmarkId,
    tagline: meta.tagline,
    viewpointId: meta.viewpointId,
  };
}

export function verseTargetToWorld(t: VerseTarget): VerseWorld {
  const path = resolvePathSample(t);
  const isFlying = t.travelT < 1 && t.flightStart !== null && t.flightEnd !== null;
  const viewRoute = VERSE_PATH_ROUTES[t.viewAnchor] ?? "/";
  const view = getRouteViewpoint(isFlying ? viewRoute : t.pathname);
  const chamber = Math.max(0, Math.min(2, t.chamberIndex));
  const scroll = Math.max(0, Math.min(1, t.depthPx / 32));

  const chamberAngle = (chamber - 1) * 0.2;
  const orbit = view.chamberOrbit;
  const dolly = scroll * view.scrollDolly;

  const lateral =
    (Math.max(-VERSE_LATERAL_MAX, Math.min(VERSE_LATERAL_MAX, t.lateralPx)) /
      VERSE_LATERAL_MAX) *
    orbit *
    2.4;

  const cx = path.camera.x + Math.sin(chamberAngle) * orbit + lateral;
  const cz = path.camera.z + Math.cos(chamberAngle) * orbit * 0.3;
  const lx = path.lookAt.x + Math.sin(chamberAngle) * orbit * 0.3 + lateral * 0.88;
  const ly = path.lookAt.y;
  const lz = path.lookAt.z;

  const dirX = lx - cx;
  const dirY = ly - path.camera.y;
  const dirZ = lz - cz;
  const len = Math.hypot(dirX, dirY, dirZ) || 1;
  const nx = dirX / len;
  const ny = dirY / len;
  const nz = dirZ / len;

  return {
    camera: {
      x: cx + nx * dolly,
      y: path.camera.y - scroll * 1.5 + ny * dolly,
      z: cz + nz * dolly,
    },
    lookAt: {
      x: lx,
      y: ly - scroll * 1,
      z: lz + nz * dolly * 0.12,
    },
    fov: path.fov + scroll * view.scrollFovBoost,
    roll: path.roll + (chamber - 1) * 1.2,
    routeIndex: t.routeIndex,
    chamberIndex: chamber,
    pathAnchor: t.pathAnchor,
    isFlying,
    viewpointId: path.viewpointId,
    focusLandmarkId: path.landmarkId,
    tagline: path.tagline,
  };
}

export { landmarkFocusStrengthFromCamera };
