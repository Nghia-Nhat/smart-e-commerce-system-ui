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
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
          },
        ],
      },
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default nextConfig;
