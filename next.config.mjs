import million from "million/compiler";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robohash.org",
        port: "",
      },
    ],
  },
};

export default million.next(nextConfig, {
  mode: "react",
  optimize: true,
  server: true,
});
