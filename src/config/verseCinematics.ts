/** Camera viewpoints into the single shared verse (see verseLandmarks.ts) */
export type RouteViewpoint = {
  id: string;
  tagline: string;
  landmarkId: string;
  camera: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov: number;
  roll: number;
  chamberOrbit: number;
  scrollDolly: number;
  scrollFovBoost: number;
};

const viewpoints: Record<string, RouteViewpoint> = {
  "/": {
    id: "origin",
    tagline: "Gravity well · particle capture",
    landmarkId: "origin",
    camera: { x: 0, y: 18, z: 55 },
    lookAt: { x: 0, y: 2, z: -28 },
    fov: 58,
    roll: 0,
    chamberOrbit: 8,
    scrollDolly: 22,
    scrollFovBoost: -8,
  },
  "/about": {
    id: "profile",
    tagline: "Spring lattice · elastic mesh",
    landmarkId: "profile",
    camera: { x: -48, y: 14, z: -5 },
    lookAt: { x: -88, y: 10, z: -58 },
    fov: 48,
    roll: -4,
    chamberOrbit: 7,
    scrollDolly: 18,
    scrollFovBoost: -6,
  },
  "/projects": {
    id: "build",
    tagline: "Elastic box · kinetic chaos",
    landmarkId: "build",
    camera: { x: 118, y: 8, z: -15 },
    lookAt: { x: 98, y: -4, z: -78 },
    fov: 50,
    roll: 5,
    chamberOrbit: 8,
    scrollDolly: 20,
    scrollFovBoost: -7,
  },
  "/experience": {
    id: "chrono",
    tagline: "Pendulum wave · phase motion",
    landmarkId: "chrono",
    camera: { x: -25, y: 38, z: -55 },
    lookAt: { x: -42, y: 28, z: -118 },
    fov: 52,
    roll: -3,
    chamberOrbit: 7,
    scrollDolly: 24,
    scrollFovBoost: -9,
  },
  "/services": {
    id: "services",
    tagline: "Three-body dance · orbital mechanics",
    landmarkId: "services",
    camera: { x: 72, y: 22, z: -48 },
    lookAt: { x: 58, y: 14, z: -102 },
    fov: 46,
    roll: 2,
    chamberOrbit: 7,
    scrollDolly: 18,
    scrollFovBoost: -6,
  },
  "/blog": {
    id: "stream",
    tagline: "Curl flow · vector field drift",
    landmarkId: "stream",
    camera: { x: 128, y: 16, z: 28 },
    lookAt: { x: 112, y: 6, z: -48 },
    fov: 44,
    roll: 6,
    chamberOrbit: 6,
    scrollDolly: 16,
    scrollFovBoost: -5,
  },
  "/contact": {
    id: "comms",
    tagline: "Buoyant plume · rising bodies",
    landmarkId: "comms",
    camera: { x: -52, y: 10, z: 42 },
    lookAt: { x: -72, y: 18, z: -18 },
    fov: 42,
    roll: 0,
    chamberOrbit: 6,
    scrollDolly: 14,
    scrollFovBoost: -4,
  },
};

export const DEFAULT_VIEWPOINT = viewpoints["/"];

export function getRouteViewpoint(pathname: string): RouteViewpoint {
  if (viewpoints[pathname]) return viewpoints[pathname];
  if (pathname.startsWith("/blog")) return viewpoints["/blog"];
  return DEFAULT_VIEWPOINT;
}

export type PhysicsKind =
  | "gravityWell"
  | "springLattice"
  | "elasticBox"
  | "pendulumWave"
  | "threeBody"
  | "curlFlow"
  | "buoyantPlume";
