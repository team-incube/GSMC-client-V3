import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '15MB',
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') ?? [],
    },
    middlewareClientMaxBodySize: '15MB',
  },
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 512, 580],
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
