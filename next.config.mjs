import million from 'million/compiler';
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
      {
        protocol: 'https',
        hostname: 'wpcarmen.wasabi-artwork.com',
      },
      {
        protocol: 'https',
        hostname: 'chezcarmen.wasabi-artwork.com',
      },
    ],
  },
};
export default million.next(nextConfig, { auto: { rsc: true } });
// export default nextConfig;
