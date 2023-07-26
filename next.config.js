/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "canversedebug.xyz",
        port: "",
        pathname:
          "/cdn-cgi/imagedelivery/j7tWLHIDLFBZQvVPxhZJVA/chess_nft/pfp_jpg/**",
      },
    ],
  },
};

module.exports = nextConfig;
