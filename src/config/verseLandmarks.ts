import type { PhysicsKind } from "./verseCinematics";

export type VerseLandmark = {
  id: string;
  pathIndex: number;
  label: string;
  kind: PhysicsKind;
  position: [number, number, number];
  scale: number;
  color: string;
  accent: string;
};

export const VERSE_LANDMARKS: VerseLandmark[] = [
  {
    id: "origin",
    pathIndex: 0,
    label: "Gravity well",
    kind: "gravityWell",
    position: [0, 2, -28],
    scale: 1.4,
    color: "#5b82a8",
    accent: "#b38256",
  },
  {
    id: "profile",
    pathIndex: 1,
    label: "Spring lattice",
    kind: "springLattice",
    position: [-88, 10, -58],
    scale: 1.15,
    color: "#9b8ed8",
    accent: "#6a9fd4",
  },
  {
    id: "build",
    pathIndex: 2,
    label: "Elastic box",
    kind: "elasticBox",
    position: [98, -4, -78],
    scale: 1.2,
    color: "#e8a86a",
    accent: "#456d94",
  },
  {
    id: "chrono",
    pathIndex: 3,
    label: "Pendulum wave",
    kind: "pendulumWave",
    position: [-42, 28, -118],
    scale: 1.25,
    color: "#b38256",
    accent: "#5b82a8",
  },
  {
    id: "services",
    pathIndex: 4,
    label: "Three-body orbit",
    kind: "threeBody",
    position: [58, 14, -102],
    scale: 1.1,
    color: "#7ab89a",
    accent: "#6a9fd4",
  },
  {
    id: "stream",
    pathIndex: 5,
    label: "Curl flow",
    kind: "curlFlow",
    position: [112, 6, -48],
    scale: 1.15,
    color: "#6ec8ff",
    accent: "#5b82a8",
  },
  {
    id: "comms",
    pathIndex: 6,
    label: "Buoyant plume",
    kind: "buoyantPlume",
    position: [-72, 18, -18],
    scale: 1.1,
    color: "#5b82a8",
    accent: "#e8d4a8",
  },
];

export function getLandmark(id: string) {
  return VERSE_LANDMARKS.find((l) => l.id === id) ?? VERSE_LANDMARKS[0];
}
