/** @type {import('next').NextConfig} */
  
  module.exports = {
    nextConfig: {
        experimental: {
          appDir: true,
        },
    },
    images: {
       domains: ["links.papareact.com", "fakestoreapi.com"]
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
  }