/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      appDir: true,
    },
  }

  const images = {
    domains: ["links.papareact.com", "fakestoreapi.com"]
  }
  
  module.exports = {
    nextConfig,
    images
  }