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
};

export default nextConfig;
