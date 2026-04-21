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
    default: "刘桐宇 - 全栈开发者",
    template: "%s | 刘桐宇",
  },
  description: "刘桐宇的个人网站 - 全栈开发者、技术博主。专注于 Web 全栈开发和人工智能应用，分享技术心得和项目经验。",
  keywords: ["刘桐宇", "全栈开发", "前端开发", "后端开发", "Next.js", "React", "Spring Boot", "人工智能", "知识库"],
  authors: [{ name: "刘桐宇", url: "https://github.com/lty931112" }],
  creator: "刘桐宇",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "刘桐宇 - 全栈开发者",
    description: "刘桐宇的个人网站 - 全栈开发者、技术博主。专注于 Web 全栈开发和人工智能应用。",
    siteName: "刘桐宇",
  },
  twitter: {
    card: "summary_large_image",
    title: "刘桐宇 - 全栈开发者",
    description: "刘桐宇的个人网站 - 全栈开发者、技术博主。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        {/* 顶部导航栏 */}
        <Header />

        {/* 主内容区域 */}
        <main className="flex-1 pt-20">{children}</main>

        {/* 页脚 */}
        <Footer />

        {/* 悬浮需求提交按钮 */}
        <FloatingButton />
      </body>
    </html>
  );
}
