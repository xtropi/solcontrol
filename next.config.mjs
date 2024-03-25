/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: isProd ? "" : "/solcontrol",
  assetPrefix: "/solcontrol",
};

export default nextConfig;
