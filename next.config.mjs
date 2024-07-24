/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverComponentsExternalPackages: ['appwrite', 'node-appwrite'],
  },
};

export default nextConfig;
