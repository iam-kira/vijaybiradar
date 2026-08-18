'use client';

/**
 * The liquid cursor — a stable-fluid simulation driven by pointer movement, composited
 * over the hall as a final postprocessing pass.
 *
 * Ported from reference/giats-portfolio/src/components/canvas/fluid, collapsed from
 * nineteen files into two. The physics is unchanged; what differs is the composite pass
 * (see fluidShaders.ts) and that the pointer is read from the window rather than a
 * wrapper element, since here the whole viewport is the experience.
 *
 * Each frame: stamp pointer movement into the velocity and dye fields, then curl →
 * vorticity → divergence → pressure → gradient subtract → advect. Everything happens in
 * small offscreen buffers (256px dye, 50px simulation), so the cost is fixed and tiny
 * regardless of window size.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import * as THREE from 'three';
import {
  advectionFrag,
  baseVertex,
  clearFrag,
  curlFrag,
  divergenceFrag,
  gradientSubtractFrag,
  postFrag,
  pressureFrag,
  splatFrag,
  vorticityFrag,
} from './fluidShaders';

/** Simulation tuning, from the reference. `swirl` is the pressure-solve iteration count. */
const OPTS = {
  intensity: 5 * 0.0001,
  force: 1,
  curl: 1,
  radius: 0.14,
  swirl: 3,
  pressure: 0.0,
  densityDissipation: 0.965,
  velocityDissipation: 0.93,
  dyeRes: 256,
  simRes: 50,
} as const;

/**
 * `depthBuffer`, not `depth` — the reference passes `depth: false`, which in current
 * three sets the layer count of a 3D render target and quietly does nothing here.
 * None of these buffers needs a depth attachment.
 */
const FBO_SETTINGS = {
  type: THREE.HalfFloatType,
  minFilter: THREE.LinearFilter,
  depthBuffer: false,
} as const;

interface Splat {
  mouseX: number;
  mouseY: number;
  velocityX: number;
  velocityY: number;
}

/** A read/write pair that swaps after each pass, so a shader can sample what it writes. */
function useDoubleFBO(size: number, format: THREE.PixelFormat, minFilter: THREE.MinificationTextureFilter) {
  const read = useFBO(size, size, { ...FBO_SETTINGS, format, minFilter });
  const write = useFBO(size, size, { ...FBO_SETTINGS, format, minFilter });

  return useMemo(
    () => ({
      read,
      write,
      swap() {
        const previous = this.read;
        this.read = this.write;
        this.write = previous;
      },
      dispose() {
        read.dispose();
        write.dispose();
      },
    }),
    [read, write]
  );
}

/** Composites the dye buffer over the rendered hall. */
class FluidEffect extends Effect {
  constructor(fluid: THREE.Texture, color: THREE.Color, intensity: number) {
    super('FluidEffect', postFrag, {
      uniforms: new Map<string, THREE.Uniform>([
        ['tFluid', new THREE.Uniform(fluid)],
        ['uColor', new THREE.Uniform(new THREE.Vector3(color.r, color.g, color.b))],
        ['uIntensity', new THREE.Uniform(intensity)],
      ]),
    });
  }

  setColor(color: THREE.Color) {
    this.uniforms.get('uColor')!.value.set(color.r, color.g, color.b);
  }

  setFluid(texture: THREE.Texture) {
    this.uniforms.get('tFluid')!.value = texture;
  }
}

export default function Fluid({ color }: { color: string }) {
  const gl = useThree((three) => three.gl);
  const size = useThree((three) => three.size);

  const density = useDoubleFBO(OPTS.dyeRes, THREE.RGBAFormat, THREE.LinearFilter);
  const velocity = useDoubleFBO(OPTS.simRes, THREE.RGFormat, THREE.LinearFilter);
  const pressure = useDoubleFBO(OPTS.simRes, THREE.RedFormat, THREE.NearestFilter);
  const divergence = useFBO(OPTS.simRes, OPTS.simRes, {
    ...FBO_SETTINGS,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
  });
  const curl = useFBO(OPTS.simRes, OPTS.simRes, {
    ...FBO_SETTINGS,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
  });

  const scene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(() => new THREE.Camera(), []);
  const quad = useRef<THREE.Mesh>(null);
  const splats = useRef<Splat[]>([]);
  const lastPointer = useRef<THREE.Vector2 | null>(null);

  const materials = useMemo(() => {
    const make = (fragmentShader: string, uniforms: Record<string, THREE.IUniform>) =>
      new THREE.ShaderMaterial({
        vertexShader: baseVertex,
        fragmentShader,
        uniforms: { ...uniforms, texelSize: { value: new THREE.Vector2() } },
        depthTest: false,
        depthWrite: false,
      });

    const blank = () => ({ value: new THREE.Texture() });

    return {
      splat: make(splatFrag, {
        uTarget: blank(),
        aspectRatio: { value: 1 },
        uColor: { value: new THREE.Vector3() },
        uPointer: { value: new THREE.Vector2() },
        uRadius: { value: OPTS.radius / 100 },
      }),
      curl: make(curlFrag, { uVelocity: blank() }),
      vorticity: make(vorticityFrag, {
        uVelocity: blank(),
        uCurl: blank(),
        uCurlValue: { value: OPTS.curl },
        dt: { value: 0.016 },
      }),
      divergence: make(divergenceFrag, { uVelocity: blank() }),
      clear: make(clearFrag, { uTexture: blank(), uClearValue: { value: OPTS.pressure } }),
      pressure: make(pressureFrag, { uPressure: blank(), uDivergence: blank() }),
      gradientSubtract: make(gradientSubtractFrag, { uPressure: blank(), uVelocity: blank() }),
      advection: make(advectionFrag, {
        uVelocity: blank(),
        uSource: blank(),
        dt: { value: 0.016 },
        uDissipation: { value: 1 },
      }),
    };
  }, []);

  useLayoutEffect(() => {
    const aspect = size.width / size.height;
    for (const material of Object.values(materials)) {
      material.uniforms.texelSize.value.set(1 / (OPTS.simRes * aspect), 1 / OPTS.simRes);
    }
    // Writing uniforms in place is how three is driven; there is nothing to re-create.
    // eslint-disable-next-line react-hooks/immutability
    materials.splat.uniforms.aspectRatio.value = aspect;

    return () => {
      for (const material of Object.values(materials)) material.dispose();
    };
  }, [materials, size]);

  useEffect(
    () => () => {
      density.dispose();
      velocity.dispose();
      pressure.dispose();
      divergence.dispose();
      curl.dispose();
    },
    [density, velocity, pressure, divergence, curl]
  );

  // The pointer is read from the window, so the trail follows across the whole page —
  // captions and canvas alike — rather than only over one element.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const previous = lastPointer.current;
      lastPointer.current = new THREE.Vector2(event.clientX, event.clientY);

      // The first move has no delta to measure, so it seeds the position and nothing else.
      if (!previous) return;

      splats.current.push({
        mouseX: event.clientX / window.innerWidth,
        mouseY: 1 - event.clientY / window.innerHeight,
        velocityX: (event.clientX - previous.x) * OPTS.force,
        velocityY: -(event.clientY - previous.y) * OPTS.force,
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const effect = useMemo(
    () => new FluidEffect(density.read.texture, new THREE.Color(color), OPTS.intensity),
    // Built once; colour and texture are pushed in below rather than rebuilding the pass.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    effect.setColor(new THREE.Color(color));
  }, [effect, color]);

  useEffect(() => () => effect.dispose(), [effect]);

  /** Renders the current material into a target, swapping read/write if it is a pair. */
  const pass = useCallback(
    (target: THREE.WebGLRenderTarget | { read: THREE.WebGLRenderTarget; write: THREE.WebGLRenderTarget; swap: () => void }) => {
      const isPair = 'write' in target;
      gl.setRenderTarget(isPair ? target.write : target);
      gl.clear();
      gl.render(scene, camera);
      if (isPair) target.swap();
    },
    [gl, scene, camera]
  );

  const use = useCallback(
    (material: THREE.ShaderMaterial, uniforms: Record<string, unknown> = {}) => {
      if (!quad.current) return;
      quad.current.material = material;
      for (const [key, value] of Object.entries(uniforms)) {
        if (material.uniforms[key]) material.uniforms[key].value = value;
      }
    },
    []
  );

  // Priority 0: EffectComposer claims the render loop at priority 1, so the simulation
  // runs first and the composite pass reads a buffer that is already current.
  useFrame(() => {
    if (!quad.current) return;

    while (splats.current.length > 0) {
      const { mouseX, mouseY, velocityX, velocityY } = splats.current.pop()!;
      const splatUniforms = {
        uPointer: new THREE.Vector2(mouseX, mouseY),
        uColor: new THREE.Vector3(velocityX, velocityY, 10),
        uRadius: OPTS.radius / 100,
      };

      use(materials.splat, { ...splatUniforms, uTarget: velocity.read.texture });
      pass(velocity);
      use(materials.splat, { ...splatUniforms, uTarget: density.read.texture });
      pass(density);
    }

    use(materials.curl, { uVelocity: velocity.read.texture });
    pass(curl);

    use(materials.vorticity, {
      uVelocity: velocity.read.texture,
      uCurl: curl.texture,
      uCurlValue: OPTS.curl,
    });
    pass(velocity);

    use(materials.divergence, { uVelocity: velocity.read.texture });
    pass(divergence);

    use(materials.clear, { uTexture: pressure.read.texture, uClearValue: OPTS.pressure });
    pass(pressure);

    use(materials.pressure, { uDivergence: divergence.texture });
    for (let i = 0; i < OPTS.swirl; i += 1) {
      use(materials.pressure, { uPressure: pressure.read.texture });
      pass(pressure);
    }

    use(materials.gradientSubtract, {
      uPressure: pressure.read.texture,
      uVelocity: velocity.read.texture,
    });
    pass(velocity);

    use(materials.advection, {
      uVelocity: velocity.read.texture,
      uSource: velocity.read.texture,
      uDissipation: OPTS.velocityDissipation,
    });
    pass(velocity);

    use(materials.advection, {
      uSource: density.read.texture,
      uDissipation: OPTS.densityDissipation,
    });
    pass(density);

    gl.setRenderTarget(null);
    effect.setFluid(density.read.texture);
  }, 0);

  return (
    <>
      {createPortal(
        <mesh ref={quad} scale={[1, 1, 0]}>
          <planeGeometry args={[2, 2, 1, 1]} />
        </mesh>,
        scene
      )}
      <EffectComposer>
        <primitive object={effect} />
      </EffectComposer>
    </>
  );
}
