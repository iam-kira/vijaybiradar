/**
 * A stable-fluid solver, ported from reference/giats-portfolio/src/components/canvas/fluid.
 *
 * The shaders are inlined as strings rather than kept as .frag files: this project builds
 * with Turbopack, where the reference's webpack raw-loader rule does not apply, and a
 * string export needs no loader, no config, and no module declaration.
 *
 * All of these run over a full-screen quad, so the vertex shader is shared. `texelSize`
 * is one simulation pixel, which is how each pass finds its four neighbours.
 */

export const baseVertex = /* glsl */ `
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main() {
  vUv = uv;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(position, 1.0);
}
`;

/** Stamps a gaussian blob of velocity (or dye) at the pointer. */
export const splatFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 uColor;
uniform vec2 uPointer;
uniform float uRadius;

void main() {
  vec2 p = vUv - uPointer.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`;

/** Rotation of the velocity field — the seed for the vorticity pass. */
export const curlFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).y;
  float R = texture2D(uVelocity, vR).y;
  float T = texture2D(uVelocity, vT).x;
  float B = texture2D(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
}
`;

/** Feeds the curl back in as force, which is what keeps the trail curling after it lands. */
export const vorticityFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlValue;
uniform float dt;

void main() {
  float L = texture2D(uCurl, vL).x;
  float R = texture2D(uCurl, vR).x;
  float T = texture2D(uCurl, vT).x;
  float B = texture2D(uCurl, vB).x;
  float C = texture2D(uCurl, vUv).x;

  vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L)) * 0.5;
  force /= length(force) + 1.0;
  force *= uCurlValue * C;
  force.y *= -1.0;

  vec2 vel = texture2D(uVelocity, vUv).xy;
  gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
}
`;

/** How much the field is expanding at each point; the right-hand side of the pressure solve. */
export const divergenceFrag = /* glsl */ `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  vec2 C = texture2D(uVelocity, vUv).xy;

  // Reflect at the edges, so the trail bounces off the frame instead of leaking out.
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }

  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`;

/** Scales a buffer by a constant — used to bleed pressure off between frames. */
export const clearFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uClearValue;

void main() { gl_FragColor = uClearValue * texture2D(uTexture, vUv); }
`;

/** One Jacobi iteration of the pressure solve; run several times per frame. */
export const pressureFrag = /* glsl */ `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;

  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

/** Subtracts the pressure gradient, leaving a divergence-free (incompressible) field. */
export const gradientSubtractFrag = /* glsl */ `
precision highp float;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;

  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;

/** Carries the field along itself, fading it — this is what makes the trail drift and decay. */
export const advectionFrag = /* glsl */ `
precision highp float;

varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float uDissipation;

void main() {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  gl_FragColor = uDissipation * texture2D(uSource, coord);
  gl_FragColor.a = 1.0;
}
`;

/**
 * The composite pass, and the one place this departs from the reference.
 *
 * giats' version only shows the fluid where the rendered scene is nearly transparent —
 * their canvas is mostly empty. VITA's hall fills every pixel at alpha 1, so that
 * version would render the trail entirely invisible.
 *
 * Mixing toward uColor rather than adding is the other change: additive can only ever
 * brighten, which works on the dark theme and blows out the pale one. A mix lets the
 * trail be a warm light in the dark hall and a drag of dark pigment in the lit one,
 * which is closer to paint either way.
 */
export const postFrag = /* glsl */ `
uniform sampler2D tFluid;
uniform vec3 uColor;
uniform float uIntensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float amount = clamp(length(texture2D(tFluid, uv).rgb) * uIntensity, 0.0, 1.0);
  outputColor = vec4(mix(inputColor.rgb, uColor, amount), inputColor.a);
}
`;
