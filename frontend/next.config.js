/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'backend-calendar-s71x.onrender.com',
        pathname: "/uploads/**/*",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
