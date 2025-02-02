/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: [
		'cdn.sanity.io',
		'images.unsplash.com',
		'fakestoreapi.com', // Add fakestoreapi.com here
	  ],
	},
	staticPageGenerationTimeout: 120,
	env: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	},
  };
  
  module.exports = nextConfig;
