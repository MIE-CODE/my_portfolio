"use client";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

// 3D Walking Avatar Component
export function WalkingAvatar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load("/avatar.jpg", (loadedTexture) => {
      loadedTexture.flipY = false;
      setTexture(loadedTexture);
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Walking animation - move back and forth
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.sin(time * 0.8) * 0.3;

      // Bouncing animation
      meshRef.current.position.y = Math.abs(Math.sin(time * 1.6)) * 0.1;

      // Slight rotation for walking effect
      meshRef.current.rotation.y = Math.sin(time * 0.8) * 0.2;

      // Subtle tilt while walking
      meshRef.current.rotation.z = Math.sin(time * 1.6) * 0.05;
    }
  });

  if (!texture) return null;

  return (
    <group>
      {/* Main Avatar Plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          emissive={new THREE.Color(0x00bcd4)}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Shadow plane on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <planeGeometry args={[1.5, 0.5]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Scene with lighting
export function Scene() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.6} />

      {/* Directional light for depth */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />

      {/* Point light for glow effect */}
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#00bcd4" />

      {/* Walking Avatar */}
      <WalkingAvatar />
    </>
  );
}

