"use client";

import { Grid, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { VersePhysicsField } from "./VersePhysics";
import { VerseTechField } from "./VerseTechHUD";
import type { VerseTarget } from "./verseState";
import { verseTargetToWorld } from "./verseState";

function CinematicCamera({
  targetRef,
}: {
  targetRef: React.MutableRefObject<VerseTarget>;
}) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(0, 4, 32));
  const look = useRef(new THREE.Vector3(0, 0, -12));
  const fov = useRef(56);
  const roll = useRef(0);
  const up = useRef(new THREE.Vector3(0, 1, 0));
  const mat = useRef(new THREE.Matrix4());

  useFrame((_, delta) => {
    const w = verseTargetToWorld(targetRef.current);
    const flying = targetRef.current.travelT < 1;
    const damp = 1 - Math.exp(-(flying ? 5.5 : 3.4) * delta);

    pos.current.set(w.camera.x, w.camera.y, w.camera.z);
    look.current.set(w.lookAt.x, w.lookAt.y, w.lookAt.z);
    fov.current = THREE.MathUtils.lerp(fov.current, w.fov, damp);
    roll.current = THREE.MathUtils.lerp(roll.current, w.roll, damp);

    camera.position.lerp(pos.current, damp);
    mat.current.lookAt(camera.position, look.current, up.current);
    camera.quaternion.setFromRotationMatrix(mat.current);
    camera.rotateZ(THREE.MathUtils.degToRad(roll.current));

    if ("fov" in camera && typeof camera.fov === "number") {
      if (Math.abs(camera.fov - fov.current) > 0.08) {
        camera.fov = fov.current;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

function StarDrift({ quality }: { quality: "full" | "low" }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = quality === "full" ? 800 : 250;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 280;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 120;
      arr[i * 3 + 2] = -Math.random() * 180 - 30;
    }
    return arr;
  }, [quality]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const n = pos.length / 3;
    for (let i = 0; i < n; i++) {
      pos[i * 3 + 2] += delta * 12;
      if (pos[i * 3 + 2] > 40) pos[i * 3 + 2] = -180 - Math.random() * 50;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={quality === "full" ? 0.12 : 0.08}
        color="#8eb8e8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


function VerseScene({
  targetRef,
  quality,
}: {
  targetRef: React.MutableRefObject<VerseTarget>;
  quality: "full" | "low";
}) {
  const starCount = quality === "full" ? 6000 : 1600;

  return (
    <>
      <color attach="background" args={["#020408"]} />
      <fog attach="fog" args={["#020408", 45, 320]} />
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#6a9fd4", "#0a0e18", 0.45]} />
      <pointLight position={[0, 12, 8]} intensity={0.4} color="#5b82a8" />
      <pointLight position={[-30, 6, -10]} intensity={0.25} color="#8b7ec8" />
      <pointLight position={[35, 4, -20]} intensity={0.25} color="#b38256" />
      <CinematicCamera targetRef={targetRef} />
      <Stars
        radius={220}
        depth={120}
        count={starCount}
        factor={5}
        saturation={0.4}
        fade
        speed={0.2}
      />
      <StarDrift quality={quality} />
      {quality === "full" && (
        <Sparkles
          count={80}
          scale={[200, 80, 160]}
          size={2.5}
          speed={0.25}
          opacity={0.3}
          color="#4a7094"
        />
      )}
      <Grid
        position={[0, -12, -50]}
        args={[200, 200]}
        cellSize={2}
        cellThickness={0.35}
        cellColor="#1a2a3a"
        sectionSize={10}
        sectionThickness={0.7}
        sectionColor="#2d4a62"
        fadeDistance={120}
        fadeStrength={1.2}
        infiniteGrid
      />
      <VersePhysicsField targetRef={targetRef} quality={quality} />
      <VerseTechField targetRef={targetRef} quality={quality} />
    </>
  );
}

type VerseSpace3DProps = {
  targetRef: React.MutableRefObject<VerseTarget>;
  quality?: "full" | "low";
};

export const VerseSpace3D = memo(function VerseSpace3D({
  targetRef,
  quality = "full",
}: VerseSpace3DProps) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 18, 55], fov: 58, near: 0.1, far: 400 }}
        gl={{
          alpha: false,
          antialias: quality === "full",
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={quality === "full" ? [1, 1.75] : 1}
        frameloop="always"
      >
        <VerseScene targetRef={targetRef} quality={quality} />
      </Canvas>
    </div>
  );
});
