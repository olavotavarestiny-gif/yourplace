import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  poweredByHeader: false,
};
export default nextConfig;
