/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'bayut-production.s3.eu-central-1.amazonaws.com']
  },
  env: {
    PUBLIC_URL: '/',
  }
}

module.exports = nextConfig
