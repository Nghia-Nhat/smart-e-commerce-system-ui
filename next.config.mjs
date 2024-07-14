/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'assets.myntassets.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
          },
        ],
      },
};

export default nextConfig;
