import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
};

export default nextConfig;
