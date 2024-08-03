/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/api/proxy/:path*',
      destination: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/:path*',
    },
  ],
};

export default nextConfig;
