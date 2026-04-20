import type { NextConfig } from "next";

/**
 * Next.js 配置文件
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  /* 启用 React 严格模式 */
  reactStrictMode: true,

  /* 远程图片域名白名单，按需添加 */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  /* 环境变量前缀，只有 NEXT_PUBLIC_ 前缀的变量才会暴露给客户端 */
  // env: {},

  /* 输出模式：standalone 适合 Docker 部署 */
  output: "standalone",

  /* 国际化配置（如需要可取消注释） */
  // i18n: {
  //   locales: ["zh-CN", "en"],
  //   defaultLocale: "zh-CN",
  // },
};

export default nextConfig;
