import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // StrictMode double-mounts effects in dev, and R3F's <Canvas> does not survive it —
  // the second pass calls createRoot() on a container that already has one, and the
  // WebGL tree is left detached. The reference project disables it for the same reason.
  reactStrictMode: false,
};

export default nextConfig;
