/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    typedRoutes: true,
  },
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
