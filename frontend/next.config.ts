import type { NextConfig } from "next";

/**
 * Next.js 配置文件
 * 静态导出模式，部署到 Nginx 托管
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  /* 静态导出模式 */
  output: "export",

  /* 静态导出时不使用 trailing slash，保持 URL 简洁 */
  trailingSlash: false,
};

export default nextConfig;
