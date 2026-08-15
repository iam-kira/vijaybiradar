"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

function Particles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const foregroundMeshRef = useRef<THREE.Points>(null);
  const count = 800;
  const foregroundCount = 400;

  const { positions: mainPositions, colors: mainColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#3b82f6");
    const purple = new THREE.Color("#8b5cf6");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const c = Math.random() > 0.5 ? blue : purple;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  const { positions: forePositions, colors: foreColors } = useMemo(() => {
    const positions = new Float32Array(foregroundCount * 3);
    const colors = new Float32Array(foregroundCount * 3);
    const cyan = new THREE.Color("#22d3ee");
    const gold = new THREE.Color("#f59e0b");

    for (let i = 0; i < foregroundCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const c = Math.random() > 0.6 ? cyan : gold;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.01 + scrollProgress * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.005) * 0.05 + scrollProgress * 0.2;
      // Depth movement based on scroll
      meshRef.current.position.z = scrollProgress * 5 - 2.5;
    }

    if (foregroundMeshRef.current) {
      const time = state.clock.getElapsedTime();
      foregroundMeshRef.current.rotation.y = time * 0.02 + scrollProgress * 0.3;
      foregroundMeshRef.current.rotation.x = Math.sin(time * 0.008) * 0.03;
    }
  });

  return (
    <>
      {/* Background layer */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={mainPositions}
            count={count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={mainColors}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.5 + scrollProgress * 0.3}
          sizeAttenuation
        />
      </points>

      {/* Foreground layer */}
      <points ref={foregroundMeshRef} position={[0, 0, 8]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={forePositions}
            count={foregroundCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={foreColors}
            count={foregroundCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.3 + scrollProgress * 0.4}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export function CinematicParticleBackground() {
  const { scrollYProgress } = useScroll();
  const cameraRef = useRef<[number, number, number]>([0, 0, 12]);
  const scrollProgress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgress.current = latest;
    // Camera moves forward as user scrolls
    cameraRef.current = [
      Math.sin(latest * Math.PI) * 2,
      Math.cos(latest * Math.PI) * 1,
      12 - latest * 3,
    ];
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: cameraRef.current,
          fov: 60 + scrollProgress.current * 10,
        }}
      >
        <Particles scrollProgress={scrollProgress.current} />
      </Canvas>
    </div>
  );
}
