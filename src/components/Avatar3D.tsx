"use client";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// Abstract Geometric Sculpture Component
const GeometricSculpture = () => {
  const mainGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  
  const particleCount = 60;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 1.5;
      const theta = (i / particleCount) * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Load textures
  const [
    albedo,
    normal,
    roughness,
    metallic,
    ao,
  ] = useTexture([
    "/texture/metal-studs_albedo.png",
    "/texture/metal-studs_normal-ogl.png",
    "/texture/metal-studs_roughness.png",
    "/texture/metal-studs_metallic.png",
    "/texture/metal-studs_ao.png",
  ]);

  // Configure texture properties
  albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
  metallic.wrapS = metallic.wrapT = THREE.RepeatWrapping;
  ao.wrapS = ao.wrapT = THREE.RepeatWrapping;

  // Create material props object
  const materialProps = {
    map: albedo,
    normalMap: normal,
    roughnessMap: roughness,
    metalnessMap: metallic,
    aoMap: ao,
    aoMapIntensity: 0.3,
    metalness: 0.85,
    roughness: 0.4,
  };

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Main group slow rotation
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = time * 0.2;
      mainGroupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Core pulsing animation
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.x = time * 0.5;
      coreRef.current.rotation.z = time * 0.3;
    }

    // Ring 1 - horizontal rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = time * 0.8;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    // Ring 2 - vertical rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.6;
      ring2Ref.current.rotation.z = Math.cos(time * 0.4) * 0.15;
    }

    // Ring 3 - diagonal rotation
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -time * 0.7;
      ring3Ref.current.rotation.x = time * 0.4;
      ring3Ref.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }

    // Particles animation
    if (particlesRef.current) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < particleCount; i++) {
        const radius = 2 + Math.sin(time + i) * 0.5;
        const theta = (i / particleCount) * Math.PI * 2 + time * 0.3;
        const phi = Math.acos((Math.sin(time * 0.2 + i * 0.1) + 1) / 2);
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        const scale = 0.08 + Math.sin(time * 2 + i) * 0.03;
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(x, y, z);
        particlesRef.current.setMatrixAt(i, matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={mainGroupRef} position={[0, 0, 0]} scale={[0.4, 0.4, 0.4]}>
      {/* Central Core - Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Ring 1 - Horizontal Torus */}
      <group ref={ring1Ref}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.08, 16, 64]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Decorative spheres on ring */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          );
        })}
      </group>

      {/* Ring 2 - Vertical Torus */}
      <group ref={ring2Ref}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.08, 16, 64]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Decorative octahedrons */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[0, Math.cos(angle) * 1.4, Math.sin(angle) * 1.4]}
            >
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          );
        })}
      </group>

      {/* Ring 3 - Diagonal Torus */}
      <group ref={ring3Ref}>
        <mesh
          position={[0, 0, 0]}
          rotation={[Math.PI / 4, Math.PI / 4, 0]}
        >
          <torusGeometry args={[1.6, 0.08, 16, 64]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Decorative tetrahedrons */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.6;
          const x = Math.cos(angle) * radius * 0.707;
          const y = Math.sin(angle) * radius * 0.707;
          const z = Math.cos(angle + Math.PI / 4) * radius * 0.707;
          return (
            <mesh key={i} position={[x, y, z]}>
              <tetrahedronGeometry args={[0.1, 0]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          );
        })}
      </group>

      {/* Orbiting Particles */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, particleCount]}
      >
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#009c9e"
          metalness={0.9}
          roughness={0.2}
          emissive="#009c9e"
          emissiveIntensity={0.3}
        />
      </instancedMesh>

      {/* Ambient glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#009c9e"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          emissive="#009c9e"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

// Camera controller component - orbits around the sculpture
const CameraController = () => {
  const targetSphericalRef = useRef({ theta: 0, phi: Math.PI / 3 });
  const currentSphericalRef = useRef({ theta: 0, phi: Math.PI / 3 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const distance = 5;

  useFrame(({ camera, gl }) => {
    // Store canvas reference
    if (!canvasRef.current && gl.domElement) {
      canvasRef.current = gl.domElement;
    }

    // Smooth interpolation for spherical coordinates
    const lerpFactor = 0.05;
    currentSphericalRef.current.theta +=
      (targetSphericalRef.current.theta - currentSphericalRef.current.theta) *
      lerpFactor;
    currentSphericalRef.current.phi +=
      (targetSphericalRef.current.phi - currentSphericalRef.current.phi) *
      lerpFactor;

    // Clamp phi to prevent flipping
    currentSphericalRef.current.phi = Math.max(
      0.1,
      Math.min(Math.PI - 0.1, currentSphericalRef.current.phi)
    );

    // Calculate camera position using spherical coordinates (orbiting)
    const { theta, phi } = currentSphericalRef.current;
    camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    camera.position.y = distance * Math.cos(phi);
    camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

    // Make camera look at the center
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is inside canvas
      const isInside =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (isInside) {
        // Normalize mouse position to -1 to 1 based on canvas
        const normalizedX = (x / rect.width) * 2 - 1;
        const normalizedY = (y / rect.height) * 2 - 1;

        // Update target spherical coordinates for orbiting
        targetSphericalRef.current.theta = normalizedX * Math.PI; // Horizontal orbit (0 to 2π)
        targetSphericalRef.current.phi =
          Math.PI / 3 + normalizedY * (Math.PI / 3); // Vertical orbit (limited range)
      } else {
        // Smoothly return to center when mouse leaves
        targetSphericalRef.current.theta *= 0.95;
        targetSphericalRef.current.phi =
          Math.PI / 3 + (targetSphericalRef.current.phi - Math.PI / 3) * 0.95;
      }
    };

    const handleMouseLeave = () => {
      // Reset to default position when mouse leaves
      targetSphericalRef.current = { theta: 0, phi: Math.PI / 3 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return null;
};

export const Avatar3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Professional lighting setup */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.8} />
      <pointLight position={[0, 3, 0]} intensity={1.2} color="#009c9e" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        intensity={2}
        penumbra={1}
        color="#ffffff"
      />
      <spotLight
        position={[-10, 10, -10]}
        angle={0.3}
        intensity={1.5}
        penumbra={1}
        color="#009c9e"
      />
      <GeometricSculpture />
      <CameraController />
    </Canvas>
  );
};
