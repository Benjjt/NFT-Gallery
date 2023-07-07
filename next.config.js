/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "canverse-io.imgix.net",
        port: "",
        pathname: "/pawnhub/pfprenders_jpg/**",
      },
    ],
  },
};

module.exports = nextConfig;
