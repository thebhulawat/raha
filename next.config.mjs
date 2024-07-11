/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/home',
            destination: '/home/calls',
            permanent: true,
          },
          {
            source: '/',
            destination: '/home/calls',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
