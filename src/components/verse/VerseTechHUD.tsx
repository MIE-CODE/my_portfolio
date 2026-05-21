"use client";

import { Billboard, Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getTechSnippet } from "@/src/config/verseTechSnippets";
import type { VerseLandmark } from "@/src/config/verseLandmarks";
import { VERSE_LANDMARKS } from "@/src/config/verseLandmarks";
import { useVersePalette } from "@/src/contexts/VersePaletteContext";
import type { VerseTarget } from "./verseState";
import { landmarkFocusStrengthFromCamera, verseTargetToWorld } from "./verseState";

function useHudPalette() {
  const { hud } = useVersePalette();
  return useMemo(
    () => ({ cyan: hud.cyan, amber: hud.amber, outline: hud.outline, panelBg: hud.panelBg }),
    [hud.amber, hud.cyan, hud.outline, hud.panelBg],
  );
}

type HudProps = {
  landmark: VerseLandmark;
  targetRef: React.MutableRefObject<VerseTarget>;
  quality: "full" | "low";
};

function useHudFocus(
  targetRef: React.MutableRefObject<VerseTarget>,
  position: [number, number, number],
) {
  const energy = useRef(0.2);
  useFrame((_, delta) => {
    const w = verseTargetToWorld(targetRef.current);
    const t = landmarkFocusStrengthFromCamera(w.camera, position, w.isFlying);
    energy.current = THREE.MathUtils.lerp(energy.current, t, 1 - Math.exp(-3.5 * delta));
  });
  return energy;
}

function arcPoints(
  radius: number,
  start: number,
  sweep: number,
  segments: number,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = start + (sweep * i) / segments;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return pts;
}

function RotatingArc({
  radius,
  start,
  sweep,
  speed,
  color,
  opacity,
  rollAxis = "z",
}: {
  radius: number;
  start: number;
  sweep: number;
  speed: number;
  color: string;
  opacity: number;
  rollAxis?: "x" | "y" | "z";
}) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(
    () => arcPoints(radius, start, sweep, 48),
    [radius, start, sweep],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * speed;
    if (rollAxis === "x") group.current.rotation.x = t;
    else if (rollAxis === "y") group.current.rotation.y = t;
    else group.current.rotation.z = t;
  });

  return (
    <group ref={group}>
      <Line
        points={points}
        color={color}
        transparent
        opacity={opacity}
        lineWidth={1}
      />
    </group>
  );
}

function HexLattice({ radius, color, opacity }: { radius: number; color: string; opacity: number }) {
  const lines = useMemo(() => {
    const hex: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2;
      const a1 = ((i + 1) / 6) * Math.PI * 2;
      hex.push(
        new THREE.Vector3(Math.cos(a0) * radius, Math.sin(a0) * radius, 0),
        new THREE.Vector3(Math.cos(a1) * radius, Math.sin(a1) * radius, 0),
      );
    }
    const inner = radius * 0.55;
    const innerHex: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const a1 = ((i + 1) / 6) * Math.PI * 2 + Math.PI / 6;
      innerHex.push(
        new THREE.Vector3(Math.cos(a0) * inner, Math.sin(a0) * inner, 0),
        new THREE.Vector3(Math.cos(a1) * inner, Math.sin(a1) * inner, 0),
      );
    }
    return { outer: hex, inner: innerHex };
  }, [radius]);

  const spin = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (spin.current) spin.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={spin}>
      <Line points={lines.outer} color={color} transparent opacity={opacity} />
      <Line points={lines.inner} color={color} transparent opacity={opacity * 0.65} />
    </group>
  );
}

function CornerBrackets({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  const s = size;
  const d = size * 0.35;
  const corners = useMemo(
    () => [
      [
        new THREE.Vector3(-s, s, 0),
        new THREE.Vector3(-s + d, s, 0),
        new THREE.Vector3(-s, s, 0),
        new THREE.Vector3(-s, s - d, 0),
      ],
      [
        new THREE.Vector3(s, s, 0),
        new THREE.Vector3(s - d, s, 0),
        new THREE.Vector3(s, s, 0),
        new THREE.Vector3(s, s - d, 0),
      ],
      [
        new THREE.Vector3(-s, -s, 0),
        new THREE.Vector3(-s + d, -s, 0),
        new THREE.Vector3(-s, -s, 0),
        new THREE.Vector3(-s, -s + d, 0),
      ],
      [
        new THREE.Vector3(s, -s, 0),
        new THREE.Vector3(s - d, -s, 0),
        new THREE.Vector3(s, -s, 0),
        new THREE.Vector3(s, -s + d, 0),
      ],
    ],
    [s, d],
  );

  return (
    <group>
      {corners.map((pts, i) => (
        <Line key={i} points={pts} color={color} transparent opacity={opacity} />
      ))}
    </group>
  );
}

function ArcReactorCore({
  scale,
  color,
  accent,
  energyRef,
}: {
  scale: number;
  color: string;
  accent: string;
  energyRef: React.MutableRefObject<number>;
}) {
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const energy = energyRef.current;
    if (core.current) {
      const pulse = 0.85 + Math.sin(t * 3) * 0.12 * energy;
      core.current.scale.setScalar(scale * pulse);
    }
    if (ring.current) ring.current.rotation.z = t * 1.4;
  });

  return (
    <group>
      <group ref={ring}>
        <RotatingArc
          radius={scale * 1.1}
          start={0}
          sweep={Math.PI * 1.35}
          speed={0}
          color={accent}
          opacity={0.35}
        />
        <RotatingArc
          radius={scale * 1.35}
          start={Math.PI}
          sweep={Math.PI * 1.1}
          speed={0}
          color={color}
          opacity={0.25}
        />
      </group>
      <mesh ref={core}>
        <octahedronGeometry args={[scale * 0.22, 0]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
      <mesh>
        <ringGeometry args={[scale * 0.5, scale * 0.52, 6]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ScanSweep({
  radius,
  energyRef,
  color,
}: {
  radius: number;
  energyRef: React.MutableRefObject<number>;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.65;
    if (mat.current) mat.current.opacity = 0.06 + energyRef.current * 0.12;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius * 0.15, radius, 40, 1, 0, Math.PI / 5]} />
      <meshBasicMaterial
        ref={mat}
        color={color}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CodeBillboard({
  landmark,
  energyRef,
  quality,
  hudCyan,
  hudAmber,
  hudOutline,
  hudPanelBg,
}: {
  landmark: VerseLandmark;
  energyRef: React.MutableRefObject<number>;
  quality: "full" | "low";
  hudCyan: string;
  hudAmber: string;
  hudOutline: string;
  hudPanelBg: string;
}) {
  const snippet = useMemo(() => getTechSnippet(landmark.id), [landmark.id]);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current || quality === "low") return;
    const opacity = Math.min(1, energyRef.current * 1.4);
    group.current.visible = opacity > 0.08;
    group.current.scale.setScalar(
      landmark.scale * 0.55 * (0.7 + opacity * 0.35),
    );
  });

  if (quality === "low") return null;

  return (
    <Billboard position={[landmark.scale * 4.2, landmark.scale * 2.8, 0]}>
      <group ref={group}>
        <mesh position={[2.2, -1.4, -0.05]}>
          <planeGeometry args={[4.6, 3.2]} />
          <meshBasicMaterial
            color={hudPanelBg}
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
        <Line
          points={[
            new THREE.Vector3(0, 0.2, 0),
            new THREE.Vector3(4.2, 0.2, 0),
            new THREE.Vector3(4.2, -2.8, 0),
            new THREE.Vector3(0, -2.8, 0),
            new THREE.Vector3(0, 0.2, 0),
          ]}
          color={landmark.color}
          transparent
          opacity={0.45}
        />
        <Text
          position={[0.15, 0, 0.01]}
          fontSize={0.2}
          color={hudCyan}
          anchorX="left"
          anchorY="top"
          maxWidth={4}
          lineHeight={0.28}
          fillOpacity={0.85}
          outlineWidth={0.01}
          outlineColor={hudOutline}
        >
          {snippet}
        </Text>
        <Text
          position={[0.15, -2.55, 0.01]}
          fontSize={0.12}
          color={hudAmber}
          anchorX="left"
          anchorY="top"
          fillOpacity={0.7}
        >
          {`// ${landmark.label.toUpperCase()} · NODE_${landmark.pathIndex}`}
        </Text>
      </group>
    </Billboard>
  );
}

function DataTicks({
  radius,
  count,
  color,
  accent,
  energyRef,
}: {
  radius: number;
  count: number;
  color: string;
  accent: string;
  energyRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = -state.clock.elapsedTime * 0.35;
    const e = energyRef.current;
    group.current.children.forEach((child, i) => {
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (m) m.opacity = 0.25 + e * 0.55;
      void i;
    });
  });

  return (
    <group ref={group}>
      {offsets.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
          <boxGeometry args={[0.06, 0.22 + (i % 3) * 0.08, 0.02]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? color : accent}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function TechLandmarkHud({ landmark, targetRef, quality }: HudProps) {
  const { cyan, amber, outline, panelBg } = useHudPalette();
  const energy = useHudFocus(targetRef, landmark.position);
  const s = landmark.scale;
  const shell = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!shell.current) return;
    const e = energy.current;
    shell.current.visible = e > 0.04;
    shell.current.scale.setScalar(0.75 + e * 0.35);
  });

  const ringOpacity = 0.2;
  const hiOpacity = 0.45;

  return (
    <group position={landmark.position}>
      <group ref={shell}>
        <ArcReactorCore
          scale={s * 2.2}
          color={landmark.color}
          accent={landmark.accent}
          energyRef={energy}
        />
        <ScanSweep radius={s * 5} energyRef={energy} color={cyan} />

        <group rotation={[Math.PI / 2.1, 0, 0]}>
          <RotatingArc
            radius={s * 4.5}
            start={0.2}
            sweep={Math.PI * 1.6}
            speed={0.22}
            color={landmark.color}
            opacity={ringOpacity + energy.current * hiOpacity}
          />
          <RotatingArc
            radius={s * 5.2}
            start={Math.PI * 0.8}
            sweep={Math.PI * 1.2}
            speed={-0.15}
            color={landmark.accent}
            opacity={ringOpacity + energy.current * 0.35}
            rollAxis="y"
          />
          <RotatingArc
            radius={s * 3.8}
            start={-0.4}
            sweep={Math.PI * 0.9}
            speed={0.35}
            color={cyan}
            opacity={0.15 + energy.current * 0.4}
            rollAxis="x"
          />
        </group>

        <HexLattice radius={s * 2.8} color={cyan} opacity={0.25} />
        <CornerBrackets size={s * 3.2} color={landmark.color} opacity={0.35} />
        <DataTicks
          radius={s * 4.8}
          count={quality === "full" ? 24 : 12}
          color={landmark.color}
          accent={amber}
          energyRef={energy}
        />
        <CodeBillboard
          landmark={landmark}
          energyRef={energy}
          quality={quality}
          hudCyan={cyan}
          hudAmber={amber}
          hudOutline={outline}
          hudPanelBg={panelBg}
        />
      </group>
    </group>
  );
}

/** World-space tech lattice between landmarks (always faint) */
function GlobalTechLattice({ quality }: { quality: "full" | "low" }) {
  const { cyan } = useHudPalette();
  const group = useRef<THREE.Group>(null);
  const segments = useMemo(() => {
    if (quality === "low") return [];
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < VERSE_LANDMARKS.length - 1; i++) {
      const a = VERSE_LANDMARKS[i].position;
      const b = VERSE_LANDMARKS[i + 1].position;
      const steps = 6;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        pts.push(
          new THREE.Vector3(
            THREE.MathUtils.lerp(a[0], b[0], t),
            THREE.MathUtils.lerp(a[1], b[1], t) + Math.sin(t * Math.PI) * 4,
            THREE.MathUtils.lerp(a[2], b[2], t),
          ),
        );
      }
    }
    return pts;
  }, [quality]);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  if (segments.length < 2) return null;

  return (
    <group ref={group} position={[0, 0, -40]}>
      <Line points={segments} color={cyan} transparent opacity={0.08} />
    </group>
  );
}

export function VerseTechField({
  targetRef,
  quality,
}: {
  targetRef: React.MutableRefObject<VerseTarget>;
  quality: "full" | "low";
}) {
  return (
    <group>
      <GlobalTechLattice quality={quality} />
      {VERSE_LANDMARKS.map((lm) => (
        <TechLandmarkHud key={lm.id} landmark={lm} targetRef={targetRef} quality={quality} />
      ))}
    </group>
  );
}
