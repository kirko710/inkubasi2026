/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'via.placeholder.com', 'images.unsplash.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default nextConfig;
