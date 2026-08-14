/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vijaybiradar',
  assetPrefix: '/vijaybiradar',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
