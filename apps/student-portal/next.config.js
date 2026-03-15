/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@iisacademy/ui', '@iisacademy/auth', '@iisacademy/quiz-engine', '@iisacademy/ai-agents', '@iisacademy/syllabus-enhancer'],
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
