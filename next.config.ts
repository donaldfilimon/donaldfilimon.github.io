import type { NextConfig } from "next";

import { generateSourceBuildId } from "./scripts/build-id";

const nextConfig: NextConfig = {
  generateBuildId: () => generateSourceBuildId(),
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
