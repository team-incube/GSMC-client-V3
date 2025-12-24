import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '20MB',
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') ?? [],
    },
    middlewareClientMaxBodySize: '20MB',
  },
  images: {
    remotePatterns: process.env.S3_IMAGE_HOSTNAME
      ? [
          {
            protocol: 'https',
            hostname: process.env.S3_IMAGE_HOSTNAME,
          },
        ]
      : [],
  },
};

export default nextConfig;
