"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/constants";

const RING_COLORS = [PALETTE.bronze, PALETTE.gold, PALETTE.oxblood, PALETTE.purple];
const RING_TILTS: [number, number, number][] = [
  [Math.PI / 2, 0, 0],
  [Math.PI / 2.4, Math.PI / 5, 0],
  [Math.PI / 1.8, -Math.PI / 6, Math.PI / 8],
  [Math.PI / 3, Math.PI / 3, 0],
];

function Ring({
  radius,
  color,
  tilt,
  spinSpeed,
  chapterWindow,
  progressRef,
}: {
  radius: number;
  color: string;
  tilt: [number, number, number];
  spinSpeed: number;
  chapterWindow: [number, number];
  progressRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * spinSpeed;
    }
    if (materialRef.current) {
      const p = progressRef.current;
      const [start, end] = chapterWindow;
      const active = p >= start && p <= end + 0.05;
      const target = active ? 1.4 : 0.25;
      materialRef.current.emissiveIntensity += (target - materialRef.current.emissiveIntensity) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} rotation={tilt}>
      <torusGeometry args={[radius, 0.045, 16, 96]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
        metalness={0.85}
        roughness={0.32}
      />
    </mesh>
  );
}

export function ArmillarySphere({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    // Dolly the camera in as scroll progress advances.
    const targetZ = 9 - progressRef.current * 5;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} color={PALETTE.gold} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color={PALETTE.gold} />
      <pointLight position={[-5, -2, 4]} intensity={0.6} color={PALETTE.purple} />
      <pointLight position={[3, -4, -3]} intensity={0.5} color={PALETTE.oxblood} />

      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color={PALETTE.gold} emissive={PALETTE.gold} emissiveIntensity={0.6} metalness={0.9} roughness={0.25} />
        </mesh>

        {[1.4, 2.0, 2.6, 3.2].map((radius, i) => (
          <Ring
            key={radius}
            radius={radius}
            color={RING_COLORS[i]}
            tilt={RING_TILTS[i]}
            spinSpeed={0.12 - i * 0.02}
            chapterWindow={[i / 4, (i + 1) / 4]}
            progressRef={progressRef}
          />
        ))}
      </group>
    </>
  );
}
