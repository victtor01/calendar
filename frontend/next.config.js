/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
