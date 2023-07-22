/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.canverse.io",
        port: "",
        pathname: "/pawnhub/pfprenders_jpg/**",
      },
    ],
  },
};

module.exports = nextConfig;
