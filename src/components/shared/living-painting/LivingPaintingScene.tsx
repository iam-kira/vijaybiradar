"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { BASE_PATH } from "@/lib/constants";
import { useSound } from "@/hooks/useSound";
import { useDepthTexture } from "./useDepthTexture";
import { usePaintingStore, useStore } from "./paintingStore";
import type { LivingPaintingProps } from "./types";

const PLANE_SEGMENTS = 128;
const DISPLACEMENT_VERTEX_SHADER = /* glsl */ `
  #include <begin_vertex>
  float depth = texture2D(uDepthMap, uv).r;
  transformed.z += (depth - 0.5) * uDisplacement;
`;

function PaintingPlane({
  image,
  depthBias,
  mode,
  store,
  isFinePointer,
}: {
  image: string;
  depthBias: number;
  mode: "push-in" | "procession";
  store: ReturnType<typeof usePaintingStore>;
  isFinePointer: boolean;
}) {
  const { camera } = useThree();
  const scroll = useScroll();
  const colorMap = useTexture(`${BASE_PATH}${image}`);
  const depthMap = useDepthTexture(`${BASE_PATH}${image}`, depthBias);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uDepthMap: { value: null as THREE.Texture | null },
      uDisplacement: { value: 0.9 },
    }),
    []
  );

  useEffect(() => {
    if (depthMap) uniforms.uDepthMap.value = depthMap;
  }, [depthMap, uniforms]);

  const sourceImage = colorMap.image as HTMLImageElement | undefined;
  const planeAspect = sourceImage?.width ? sourceImage.width / sourceImage.height : 1.5;
  const planeHeight = 6;
  const planeWidth = planeHeight * planeAspect;

  useFrame((state, delta) => {
    const progress = scroll.offset;
    store.getState().setProgress(progress);

    if (mode === "push-in") {
      const targetZ = 6 - progress * 3.4;
      const targetX = (progress - 0.5) * 0.6;
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta);
    } else {
      // procession: truck sideways across the plane instead of pushing in
      const targetX = (progress - 0.5) * planeWidth * 0.7;
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 4.2, 4, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3, delta);
    }

    if (isFinePointer) {
      const px = state.pointer.x * 0.25;
      const py = state.pointer.y * 0.15;
      camera.position.x += px * 0.15;
      camera.position.y = THREE.MathUtils.damp(camera.position.y, py * 0.15, 4, delta);
    } else {
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0, 4, delta);
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight, PLANE_SEGMENTS, PLANE_SEGMENTS]} />
      <meshStandardMaterial
        ref={materialRef}
        map={colorMap}
        roughness={0.85}
        metalness={0}
        onBeforeCompile={(shader) => {
          shader.uniforms.uDepthMap = uniforms.uDepthMap;
          shader.uniforms.uDisplacement = uniforms.uDisplacement;
          shader.vertexShader = `uniform sampler2D uDepthMap;\nuniform float uDisplacement;\n${shader.vertexShader}`;
          shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", DISPLACEMENT_VERTEX_SHADER);
        }}
      />
    </mesh>
  );
}

function CaptionOverlay({
  captions,
  store,
}: {
  captions: LivingPaintingProps["captions"];
  store: ReturnType<typeof usePaintingStore>;
}) {
  const progress = useStore(store, (s) => s.progress);
  if (!captions || captions.length === 0) return null;

  let active = captions[0];
  for (const c of captions) {
    if (progress >= c.at) active = c;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex justify-center px-6 md:bottom-14">
      <p className="glass-panel max-w-xl rounded-2xl px-5 py-3 text-center font-display text-lg leading-snug text-text-primary transition-opacity duration-500 md:text-xl">
        {active.text}
      </p>
    </div>
  );
}

export function LivingPaintingScene({
  image,
  alt,
  captions,
  mode = "push-in",
  heightVh = 140,
  depthBias = 0,
  className = "",
  children,
}: LivingPaintingProps) {
  const store = usePaintingStore();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const { playSfx } = useSound();
  const pages = Math.max(1, heightVh / 100);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const unsub = store.subscribe((state, prev) => {
      if (state.progress > 0.05 && prev.progress <= 0.05) playSfx("whoosh");
    });
    return unsub;
  }, [store, playSfx]);

  return (
    <div className={`relative overflow-hidden rounded-[28px] ${className}`} style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 h-screen w-full" role="img" aria-label={alt}>
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1} />
          <ScrollControls pages={pages} damping={0.2}>
            <PaintingPlane image={image} depthBias={depthBias} mode={mode} store={store} isFinePointer={isFinePointer} />
          </ScrollControls>
        </Canvas>
        <div className="imperium-tint-overlay pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <CaptionOverlay captions={captions} store={store} />
        {mode === "procession" && children && (
          <div className="pointer-events-auto absolute inset-x-0 bottom-24 z-10 flex justify-center gap-4 overflow-x-auto px-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
