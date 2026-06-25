/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Linting runs as its own CI step (`npm run lint`, flat config). Next 15's
  // internal `next build` lint pass uses a legacy ESLint path that errors on
  // flat config, so skip it here to keep builds clean.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
