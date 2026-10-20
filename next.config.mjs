/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The page ships vector/CSS mockups only. If you add photography later,
  // render it with next/image so it is resized, lazy-loaded and served as AVIF/WebP.
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
