import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'gravatar.com',
      },
    ],
  },
};

export default nextConfig;
