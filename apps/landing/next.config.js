/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@iisacademy/ui', '@iisacademy/auth'],
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
