import million from 'million/compiler';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
      },
    ],
  },
};

export default million.next(nextConfig);
