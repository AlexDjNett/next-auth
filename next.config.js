/** @type {import('next').NextConfig} */
const nextConfig = {
  //   serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
}

module.exports = nextConfig
