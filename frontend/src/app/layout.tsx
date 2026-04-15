import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButton } from "@/components/layout/FloatingButton";

/**
 * 根布局组件
 * 包含顶部导航栏、主内容区域、页脚和悬浮按钮
 */

export const metadata: Metadata = {
  title: {
    default: "首页",
    template: "%s | MyApp",
  },
  description: "MyApp - 企业级前端应用",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col antialiased">
        {/* 顶部导航栏 */}
        <Header />

        {/* 主内容区域 */}
        <main className="flex-1">{children}</main>

        {/* 页脚 */}
        <Footer />

        {/* 悬浮需求提交按钮 */}
        <FloatingButton />
      </body>
    </html>
  );
}
