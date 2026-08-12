import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep file tracing inside this project when another package lockfile exists above it.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
