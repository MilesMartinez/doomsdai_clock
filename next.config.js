/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for static site generation
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.GITHUB_ACTIONS ? '/doomsdai_clock' : '', // Required for GitHub Pages
}

module.exports = nextConfig 