import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '20MB',
    },
    middlewareClientMaxBodySize: '20MB',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_IMAGE_HOSTNAME || '',
      },
    ],
  },
};

export default nextConfig;
