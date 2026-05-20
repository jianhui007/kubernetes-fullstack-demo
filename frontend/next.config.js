/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend-service:3000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
