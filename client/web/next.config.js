/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Add PWA configuration
  // In production, service worker will register and handle offline functionality
  output: 'standalone',
  swcMinify: true,
};

module.exports = nextConfig;
