"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { VerseLandmark } from "@/src/config/verseLandmarks";
import { VERSE_LANDMARKS } from "@/src/config/verseLandmarks";
import type { VerseTarget } from "./verseState";
import { landmarkFocusStrengthFromCamera, verseTargetToWorld } from "./verseState";

type SimProps = {
  landmark: VerseLandmark;
  targetRef: React.MutableRefObject<VerseTarget>;
  quality: "full" | "low";
};

function useFocus(
  targetRef: React.MutableRefObject<VerseTarget>,
  position: [number, number, number],
) {
  const energy = useRef(0.35);
  useFrame((_, delta) => {
    const w = verseTargetToWorld(targetRef.current);
    const t = landmarkFocusStrengthFromCamera(w.camera, position, w.isFlying);
    energy.current = THREE.MathUtils.lerp(energy.current, t, 1 - Math.exp(-3 * delta));
  });
  return energy;
}

/** Accreting particles with angular momentum */
function GravityWell({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const n = quality === "full" ? 220 : 80;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const state = useRef({
    px: new Float32Array(n * 3),
    vx: new Float32Array(n * 3),
  });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    const { px, vx } = state.current;
    for (let i = 0; i < n; i++) {
      const r = 4 + Math.random() * 14;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6;
      px[i * 3] = Math.cos(a) * r;
      px[i * 3 + 1] = y;
      px[i * 3 + 2] = Math.sin(a) * r;
      const sp = Math.sqrt(landmark.scale * 8 / r);
      vx[i * 3] = -Math.sin(a) * sp;
      vx[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      vx[i * 3 + 2] = Math.cos(a) * sp;
    }
  }, [n, landmark.scale]);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const s = landmark.scale;
    const { px, vx } = state.current;
    const g = 12 * s;
    const damp = 0.998;

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;
      let x = px[i3];
      let y = px[i3 + 1];
      let z = px[i3 + 2];
      const r = Math.hypot(x, z) || 0.1;
      const f = (g / (r * r)) * (0.6 + energy.current * 0.4);
      vx[i3] += (-x / r) * f * dt;
      vx[i3 + 2] += (-z / r) * f * dt;
      vx[i3 + 1] += -y * 0.15 * dt;
      vx[i3] *= damp;
      vx[i3 + 1] *= damp;
      vx[i3 + 2] *= damp;
      x += vx[i3] * dt;
      y += vx[i3 + 1] * dt;
      z += vx[i3 + 2] * dt;
      if (Math.hypot(x, y, z) > 22 * s) {
        const a = Math.random() * Math.PI * 2;
        const nr = 8 + Math.random() * 4;
        x = Math.cos(a) * nr;
        z = Math.sin(a) * nr;
        y = (Math.random() - 0.5) * 2;
        const sp = Math.sqrt(8 / nr);
        vx[i3] = -Math.sin(a) * sp;
        vx[i3 + 2] = Math.cos(a) * sp;
        vx[i3 + 1] = 0;
      }
      px[i3] = x;
      px[i3 + 1] = y;
      px[i3 + 2] = z;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.08 + energy.current * 0.06);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + energy.current * 0.8;
  });

  return (
    <group position={landmark.position}>
      <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.color}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </instancedMesh>
      <mesh>
        <sphereGeometry args={[0.6 * landmark.scale, 16, 16]} />
        <meshBasicMaterial color="#020408" toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Spring-connected node cloud */
function SpringLattice({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const n = quality === "full" ? 24 : 12;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const rest = useMemo(() => {
    const p: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = 3 + (i % 3) * 1.5;
      p.push(
        new THREE.Vector3(
          Math.cos(a) * r * landmark.scale,
          (i % 4) * 1.2 - 2,
          Math.sin(a) * r * landmark.scale,
        ),
      );
    }
    return p;
  }, [n, landmark.scale]);

  const pos = useRef(rest.map((v) => v.clone()));
  const vel = useRef(rest.map(() => new THREE.Vector3()));

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const k = 8 + energy.current * 6;
    const damp = 0.92;
    const positions = pos.current;
    const velocities = vel.current;

    for (let i = 0; i < n; i++) {
      const f = new THREE.Vector3();
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const d = new THREE.Vector3().subVectors(positions[i], positions[j]);
        const dist = d.length();
        if (dist < 0.01 || dist > 8 * landmark.scale) continue;
        const restLen = rest[i].distanceTo(rest[j]);
        d.normalize().multiplyScalar(-k * (dist - restLen));
        f.add(d);
      }
      f.add(rest[i].clone().sub(positions[i]).multiplyScalar(k * 0.5));
      f.y -= 2 * dt;
      velocities[i].add(f.multiplyScalar(dt));
      velocities[i].multiplyScalar(damp);
      positions[i].add(velocities[i].clone().multiplyScalar(dt));
    }

    const lineVerts: number[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (positions[i].distanceTo(positions[j]) < 7 * landmark.scale) {
          lineVerts.push(
            positions[i].x,
            positions[i].y,
            positions[i].z,
            positions[j].x,
            positions[j].y,
            positions[j].z,
          );
        }
      }
    }

    if (lines.current) {
      lines.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(lineVerts, 3),
      );
    }

    for (let i = 0; i < n; i++) {
      dummy.position.copy(positions[i]);
      dummy.scale.setScalar(0.15 + energy.current * 0.08);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={landmark.position}>
      <lineSegments ref={lines}>
        <bufferGeometry />
        <lineBasicMaterial color={landmark.accent} transparent opacity={0.35} />
      </lineSegments>
      <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.accent}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/** Balls in a box — elastic collisions */
function ElasticBox({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const n = quality === "full" ? 36 : 14;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const half = 7 * landmark.scale;

  const balls = useRef(
    Array.from({ length: n }, () => ({
      p: new THREE.Vector3(
        (Math.random() - 0.5) * half * 1.6,
        Math.random() * half * 1.5 + 1,
        (Math.random() - 0.5) * half * 1.6,
      ),
      v: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ),
      r: 0.35 + Math.random() * 0.35,
    })),
  );

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const g = -14;
    const rest = 0.82;
    const sub = Math.min(dt, 0.033);

    for (const b of balls.current) {
      b.v.y += g * sub;
      b.p.add(b.v.clone().multiplyScalar(sub));
      if (b.p.x < -half + b.r) {
        b.p.x = -half + b.r;
        b.v.x *= -rest;
      }
      if (b.p.x > half - b.r) {
        b.p.x = half - b.r;
        b.v.x *= -rest;
      }
      if (b.p.y < b.r) {
        b.p.y = b.r;
        b.v.y *= -rest;
      }
      if (b.p.y > half * 2 - b.r) {
        b.p.y = half * 2 - b.r;
        b.v.y *= -rest;
      }
      if (b.p.z < -half + b.r) {
        b.p.z = -half + b.r;
        b.v.z *= -rest;
      }
      if (b.p.z > half - b.r) {
        b.p.z = half - b.r;
        b.v.z *= -rest;
      }
    }

    for (let i = 0; i < balls.current.length; i++) {
      for (let j = i + 1; j < balls.current.length; j++) {
        const a = balls.current[i];
        const b = balls.current[j];
        const d = new THREE.Vector3().subVectors(b.p, a.p);
        const dist = d.length();
        const minD = a.r + b.r;
        if (dist < minD && dist > 0.001) {
          d.normalize();
          const overlap = minD - dist;
          a.p.add(d.clone().multiplyScalar(-overlap * 0.5));
          b.p.add(d.clone().multiplyScalar(overlap * 0.5));
          const rel = new THREE.Vector3().subVectors(b.v, a.v);
          const sep = d.clone().multiplyScalar(rel.dot(d));
          a.v.add(sep.clone().multiplyScalar(rest));
          b.v.sub(sep.clone().multiplyScalar(rest));
        }
      }
    }

    balls.current.forEach((b, i) => {
      dummy.position.copy(b.p);
      dummy.scale.setScalar(b.r * (0.9 + energy.current * 0.15));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={landmark.position}>
      <mesh position={[0, half, 0]}>
        <boxGeometry args={[half * 2, half * 2, half * 2]} />
        <meshBasicMaterial color={landmark.color} wireframe transparent opacity={0.08} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.accent}
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.15}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/** Coupled pendulum wave */
function PendulumWave({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const count = quality === "full" ? 18 : 10;
  const len = 5 * landmark.scale;
  const group = useRef<THREE.Group>(null);
  const angles = useRef(new Float32Array(count));
  const vel = useRef(new Float32Array(count));

  useFrame((state, dt) => {
    if (!group.current) return;
    const g = 9.8;
    const damp = 0.999;
    const drive = Math.sin(state.clock.elapsedTime * 1.2) * 0.35 * energy.current;

    for (let i = 0; i < count; i++) {
      const acc = (-g / len) * Math.sin(angles.current[i]) + (i === 0 ? drive : 0);
      vel.current[i] += acc * dt;
      vel.current[i] *= damp;
      angles.current[i] += vel.current[i] * dt;
      const bob = group.current.children[i] as THREE.Mesh;
      if (bob) {
        const x = (i - count / 2) * 1.1 * landmark.scale;
        bob.position.set(
          x + Math.sin(angles.current[i]) * len,
          -Math.cos(angles.current[i]) * len,
          0,
        );
      }
    }
  });

  return (
    <group position={landmark.position}>
      <group ref={group}>
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i} position={[(i - count / 2) * 1.1 * landmark.scale, 0, 0]}>
            <sphereGeometry args={[0.35 * landmark.scale, 10, 10]} />
            <meshStandardMaterial
              color={i % 2 ? landmark.accent : landmark.color}
              emissive={landmark.color}
              emissiveIntensity={0.55}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Simplified three-body problem */
function ThreeBody(props: SimProps) {
  const { landmark, targetRef } = props;
  const energy = useFocus(targetRef, landmark.position);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const s = landmark.scale * 3;

  const bodies = useRef([
    { m: 1.2, p: new THREE.Vector3(-s, 0, 0), v: new THREE.Vector3(0, 0.8, 0) },
    { m: 1, p: new THREE.Vector3(s, 0, 0), v: new THREE.Vector3(0, -0.8, 0) },
    { m: 0.8, p: new THREE.Vector3(0, 0, s), v: new THREE.Vector3(-0.8, 0, 0) },
  ]);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const G = 4 * (0.7 + energy.current * 0.5);
    const sub = Math.min(dt, 0.025);

    for (const b of bodies.current) {
      const f = new THREE.Vector3();
      for (const o of bodies.current) {
        if (b === o) continue;
        const d = new THREE.Vector3().subVectors(o.p, b.p);
        const r2 = d.lengthSq() + 0.8;
        f.add(d.normalize().multiplyScalar((G * b.m * o.m) / r2));
      }
      b.v.add(f.multiplyScalar(sub / b.m));
      b.p.add(b.v.clone().multiplyScalar(sub));
    }

    bodies.current.forEach((b, i) => {
      dummy.position.copy(b.p);
      dummy.scale.setScalar(0.5 + b.m * 0.2);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={landmark.position}>
      <instancedMesh ref={mesh} args={[undefined, undefined, 3]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.accent}
          emissiveIntensity={0.75}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

function curl(x: number, y: number, z: number, t: number) {
  return new THREE.Vector3(
    Math.sin(y * 0.3 + t) + Math.cos(z * 0.3 + t),
    Math.sin(z * 0.3 + t) - Math.cos(x * 0.3 + t),
    Math.sin(x * 0.3 + t) - Math.cos(y * 0.3 + t),
  );
}

/** Particles advected by curl noise field */
function CurlFlow({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const n = quality === "full" ? 180 : 60;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const parts = useRef(
    Array.from({ length: n }, () => ({
      p: new THREE.Vector3(
        (Math.random() - 0.5) * 16 * landmark.scale,
        (Math.random() - 0.5) * 10 * landmark.scale,
        (Math.random() - 0.5) * 16 * landmark.scale,
      ),
    })),
  );

  useFrame((state, dt) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const speed = 2.5 * (0.6 + energy.current * 0.6);

    parts.current.forEach((part, i) => {
      const v = curl(part.p.x, part.p.y, part.p.z, t).multiplyScalar(speed);
      part.p.add(v.multiplyScalar(dt));
      const lim = 10 * landmark.scale;
      if (Math.abs(part.p.x) > lim || Math.abs(part.p.y) > lim || Math.abs(part.p.z) > lim) {
        part.p.set(
          (Math.random() - 0.5) * lim,
          (Math.random() - 0.5) * lim * 0.6,
          (Math.random() - 0.5) * lim,
        );
      }
      dummy.position.copy(part.p);
      dummy.scale.setScalar(0.1 + energy.current * 0.05);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={landmark.position}>
      <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
        <sphereGeometry args={[1, 5, 5]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.accent}
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/** Rising particles with drag and turbulence */
function BuoyantPlume({ landmark, targetRef, quality }: SimProps) {
  const energy = useFocus(targetRef, landmark.position);
  const n = quality === "full" ? 150 : 55;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const parts = useRef(
    Array.from({ length: n }, () => ({
      p: new THREE.Vector3((Math.random() - 0.5) * 3, -6 - Math.random() * 4, (Math.random() - 0.5) * 3),
      v: new THREE.Vector3(),
    })),
  );

  useFrame((state, dt) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const up = 6 + energy.current * 4;
    const drag = 0.96;

    parts.current.forEach((part, i) => {
      part.v.x += (Math.sin(t * 2 + part.p.y) * 0.8 - part.v.x) * dt;
      part.v.z += (Math.cos(t * 1.7 + part.p.x) * 0.8 - part.v.z) * dt;
      part.v.y += up * dt;
      part.v.multiplyScalar(drag);
      part.p.add(part.v.clone().multiplyScalar(dt));
      if (part.p.y > 14 * landmark.scale) {
        part.p.set((Math.random() - 0.5) * 3, -8, (Math.random() - 0.5) * 3);
        part.v.set(0, 0, 0);
      }
      dummy.position.copy(part.p);
      dummy.scale.setScalar(0.12 + energy.current * 0.06);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={landmark.position}>
      <instancedMesh ref={mesh} args={[undefined, undefined, n]}>
        <sphereGeometry args={[1, 5, 5]} />
        <meshStandardMaterial
          color={landmark.color}
          emissive={landmark.accent}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

export function PhysicsSim({ landmark, targetRef, quality }: SimProps) {
  switch (landmark.kind) {
    case "springLattice":
      return <SpringLattice landmark={landmark} targetRef={targetRef} quality={quality} />;
    case "elasticBox":
      return <ElasticBox landmark={landmark} targetRef={targetRef} quality={quality} />;
    case "pendulumWave":
      return <PendulumWave landmark={landmark} targetRef={targetRef} quality={quality} />;
    case "threeBody":
      return <ThreeBody landmark={landmark} targetRef={targetRef} quality={quality} />;
    case "curlFlow":
      return <CurlFlow landmark={landmark} targetRef={targetRef} quality={quality} />;
    case "buoyantPlume":
      return <BuoyantPlume landmark={landmark} targetRef={targetRef} quality={quality} />;
    default:
      return <GravityWell landmark={landmark} targetRef={targetRef} quality={quality} />;
  }
}

export function VersePhysicsField({
  targetRef,
  quality,
}: {
  targetRef: React.MutableRefObject<VerseTarget>;
  quality: "full" | "low";
}) {
  return (
    <group>
      {VERSE_LANDMARKS.map((lm) => (
        <PhysicsSim key={lm.id} landmark={lm} targetRef={targetRef} quality={quality} />
      ))}
    </group>
  );
}
