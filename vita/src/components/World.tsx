'use client';

import { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Preload, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { CAMERA_OFFSET, PALETTES, TRAVEL, scenes, type Theme } from '@/data/scenes';
import { useHasFinePointer } from '@/hooks/usePrefersReducedMotion';
import Corridor from './Corridor';
import Fluid from './Fluid';
import { usePortalStore } from './Portal';
import SceneCaptions from './SceneCaptions';

/**
 * Nothing on the page actually scrolls. ScrollControls turns the wheel into a single
 * 0→1 float, and that float walks the camera down the hall. damp() is what makes it
 * feel cinematic rather than glued to the wheel — the camera chases a target it never
 * quite catches, framerate-independently.
 */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scroll = useScroll();
  const { camera } = useThree();
  const inPortal = usePortalStore((s) => s.active !== null);

  useFrame((state, delta) => {
    // Inside a portal the hall is not where the visitor is; leaving the camera parked
    // means stepping back out returns them exactly where they left off.
    if (inPortal) return;

    const targetZ = CAMERA_OFFSET - scroll.offset * TRAVEL;

    if (reducedMotion) {
      // Follow the wheel exactly, and hold the camera dead level.
      // eslint-disable-next-line react-hooks/immutability -- driving the camera per frame is the point of useFrame
      camera.position.z = targetZ;
      camera.rotation.set(0, 0, 0);
      return;
    }

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);

    // Pointer drift, so the hall breathes even when the viewer is still.
    const targetRotY = -state.pointer.x * 0.06;
    const targetRotX = state.pointer.y * 0.035;
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetRotY, 3, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetRotX, 3, delta);
  });

  return null;
}

export default function World({
  theme,
  reducedMotion,
}: {
  theme: Theme;
  reducedMotion: boolean;
}) {
  const palette = PALETTES[theme];
  // On touch there is no cursor to trail, and under reduced motion a smear that keeps
  // moving after the pointer stops is exactly what the setting is asking us not to do.
  const fluidCursor = useHasFinePointer() && !reducedMotion;

  return (
    <Canvas
      // Unlit materials cost almost nothing to shade, so resolution is where the frame
      // budget goes — but 3× on a phone is still wasted on a hazy, low-contrast scene.
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, CAMERA_OFFSET], fov: 60, near: 0.1, far: 400 }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <color attach="background" args={[palette.backdrop]} />
      {/* The only depth cue in an unlit scene: far things fade into the backdrop. */}
      <fog attach="fog" args={[palette.backdrop, palette.fogNear, palette.fogFar]} />

      <ScrollControls pages={scenes.length} damping={reducedMotion ? 0 : 0.35}>
        <CameraRig reducedMotion={reducedMotion} />
        <Suspense fallback={null}>
          <Corridor theme={theme} />
        </Suspense>

        {/* pointer-events-none so the wheel keeps reaching ScrollControls; the one
            interactive element re-enables them on itself. */}
        <Scroll html style={{ width: '100%' }}>
          <div className="pointer-events-none">
            <SceneCaptions />
          </div>
        </Scroll>
      </ScrollControls>

      {fluidCursor && <Fluid color={palette.trail} />}

      <Preload all />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
