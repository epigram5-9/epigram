/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    domains: ['phinf.pstatic.net', 'k.kakaocdn.net'],
  },
};

export default nextConfig;
