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
        hostname: 'gsmc-s3-bucket.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
