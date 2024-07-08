/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'assets.myntassets.com',
          },
        ],
      },
};

export default nextConfig;
