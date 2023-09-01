// import million from 'million/compiler';
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
    ],
  },
};

// export default million.next(nextConfig, { auto: { rsc: true } });
export default nextConfig;
