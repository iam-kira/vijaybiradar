'use client';

/**
 * The two portals — JOURNEY and BUILD — following mohit's MeshPortalMaterial trick.
 *
 * A framed opening stands at the chapter centre facing back up the hall. Click it and
 * `blend` runs 0 → 1, which takes the portal's own scene full-screen: the camera has
 * crossed into a separate space. Escape, or the close control, runs it back.
 *
 * Two deliberate simplifications against the reference:
 *
 * Inside a portal the *content* moves, not the camera. MeshPortalMaterial renders its
 * scene through the main camera, so riding a spline through it would mean fighting that;
 * translating the timeline past a fixed viewpoint looks identical and is a subtraction.
 *
 * And the readable text is DOM, in PortalOverlay, exactly as SceneCaptions already is.
 * Three-dimensional glyphs would mean troika and a font fetched from a CDN, for text
 * that would then be unselectable and invisible to a screen reader.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, type ComponentRef } from 'react';
import { MeshPortalMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { create } from 'zustand';
import * as THREE from 'three';
import { FLOOR_Y, type Palette } from '@/data/scenes';
import { milestones, projects } from '@/data/portals';
import { archGeometry } from './Corridor';

export type PortalId = 'journey' | 'build';

interface PortalState {
  active: PortalId | null;
  /** 0–1 through the portal's contents; the wheel drives it while one is open. */
  progress: number;
  open: (id: PortalId) => void;
  close: () => void;
  setProgress: (progress: number) => void;
}

export const usePortalStore = create<PortalState>((set) => ({
  active: null,
  progress: 0,
  open: (id) => set({ active: id, progress: 0 }),
  close: () => set({ active: null, progress: 0 }),
  setProgress: (progress) => set({ progress: THREE.MathUtils.clamp(progress, 0, 1) }),
}));

const PORTAL_WIDTH = 5;
const PORTAL_HEIGHT = 7.5;

/** How far the timeline travels past the viewpoint from end to end. */
const TIMELINE_TRAVEL = 60;
const TIMELINE_STEP = TIMELINE_TRAVEL / Math.max(milestones.length - 1, 1);
/** Project tiles are laid out in one row and panned sideways. */
const TILE_STEP = 7;
const TILE_TRAVEL = TILE_STEP * Math.max(projects.length - 1, 1);

/**
 * Both interiors are laid out relative to the camera every frame rather than around the
 * origin. MeshPortalMaterial renders its scene through the *main* camera, which is
 * parked wherever in the hall the portal happened to be — so content sitting at the
 * origin would be framed from an arbitrary distance and angle.
 *
 * Reading progress from the store here rather than subscribing also keeps a wheel event
 * from re-rendering the interior; only the matrix moves.
 */
function useTracksCamera(place: (group: THREE.Group, camera: THREE.Camera, progress: number) => void) {
  const group = useRef<THREE.Group>(null);
  const camera = useThree((three) => three.camera);

  useFrame(() => {
    if (group.current) place(group.current, camera, usePortalStore.getState().progress);
  });

  return group;
}

/** How far ahead of the viewpoint the current entry sits. */
const VIEW_DISTANCE = 14;

/**
 * JOURNEY: a receding avenue of arches with a marker at each milestone, sliding toward
 * the viewpoint as progress advances — the timeline is something you travel along.
 */
function JourneyInterior({ palette }: { palette: Palette }) {
  const group = useTracksCamera((g, camera, progress) => {
    g.position.set(
      camera.position.x,
      0,
      camera.position.z - VIEW_DISTANCE + progress * TIMELINE_TRAVEL
    );
  });

  return (
    <>
      <color attach="background" args={[palette.backdrop]} />
      <fog attach="fog" args={[palette.backdrop, 8, 70]} />

      <group ref={group}>
        {milestones.map((milestone, i) => (
          <group key={milestone.year} position={[0, FLOOR_Y, -i * TIMELINE_STEP]}>
            <mesh geometry={archGeometry} scale={[0.45, 0.45, 0.45]}>
              <meshBasicMaterial color={palette.stone} />
            </mesh>
            {/* The marker on the floor: you are standing at this year. */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
              <ringGeometry args={[1.5, 1.75, 48]} />
              <meshBasicMaterial color={palette.glow} transparent opacity={0.55} />
            </mesh>
          </group>
        ))}

        {/* The floor the avenue stands on, long enough to outrun the fog. */}
        <mesh rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, -TIMELINE_TRAVEL / 2]}>
          <planeGeometry args={[16, TIMELINE_TRAVEL + 40]} />
          <meshBasicMaterial color={palette.floor} />
        </mesh>
      </group>
    </>
  );
}

/** BUILD: the projects as framed tiles in a row, panned past the viewpoint. */
function BuildInterior({ palette }: { palette: Palette }) {
  const group = useTracksCamera((g, camera, progress) => {
    g.position.set(
      camera.position.x - progress * TILE_TRAVEL,
      camera.position.y,
      camera.position.z - VIEW_DISTANCE
    );
  });

  return (
    <>
      <color attach="background" args={[palette.backdrop]} />
      <fog attach="fog" args={[palette.backdrop, 12, 60]} />

      <group ref={group}>
        {projects.map((project, i) => (
          <group key={project.title} position={[i * TILE_STEP, 0, 0]}>
            <mesh>
              <planeGeometry args={[5.6, 3.6]} />
              <meshBasicMaterial color={palette.wall} />
            </mesh>
            {/* A stone edge, so a tile reads as a framed panel rather than a rectangle. */}
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[6, 4]} />
              <meshBasicMaterial color={palette.stone} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

interface PortalProps {
  id: PortalId;
  position: [number, number, number];
  palette: Palette;
}

/** drei types the ref as its own element shape rather than a plain ShaderMaterial. */
type PortalMaterial = ComponentRef<typeof MeshPortalMaterial>;

export default function Portal({ id, position, palette }: PortalProps) {
  const material = useRef<PortalMaterial>(null);
  const active = usePortalStore((s) => s.active);
  const open = usePortalStore((s) => s.open);
  const isOpen = active === id;

  useLayoutEffect(() => {
    if (!material.current) return;
    const tween = gsap.to(material.current, {
      blend: isOpen ? 1 : 0,
      duration: 0.9,
      ease: 'power2.inOut',
    });
    return () => {
      tween.kill();
    };
  }, [isOpen]);

  const onClick = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      // Ignore clicks on a portal that is already the space you are standing in.
      if (!usePortalStore.getState().active) open(id);
    },
    [id, open]
  );

  return (
    <group position={position}>
      {/* Stone surround, sitting just behind the opening. */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[PORTAL_WIDTH + 1, PORTAL_HEIGHT + 1]} />
        <meshBasicMaterial color={palette.stone} />
      </mesh>

      <mesh onClick={onClick}>
        <planeGeometry args={[PORTAL_WIDTH, PORTAL_HEIGHT]} />
        <MeshPortalMaterial ref={material} blend={0} resolution={512} blur={0}>
          {id === 'journey' ? (
            <JourneyInterior palette={palette} />
          ) : (
            <BuildInterior palette={palette} />
          )}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

/**
 * While a portal is open the wheel belongs to it, not to the hall. The listener is on
 * the capture phase so ScrollControls never sees the event — otherwise the hall camera
 * would drift behind the portal and the exit would land somewhere unexpected.
 */
export function usePortalWheel() {
  const active = usePortalStore((s) => s.active);

  useEffect(() => {
    if (!active) return;

    const span = active === 'journey' ? milestones.length : projects.length;

    const onWheel = (event: WheelEvent) => {
      event.stopPropagation();
      const { progress, setProgress } = usePortalStore.getState();
      setProgress(progress + event.deltaY / (span * 260));
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') usePortalStore.getState().close();
    };

    window.addEventListener('wheel', onWheel, { capture: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);
}
