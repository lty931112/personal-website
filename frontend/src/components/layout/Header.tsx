"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * 顶部导航栏组件
 * 包含 Logo、主导航链接、移动端汉堡菜单
 */

/* 导航链接配置 */
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/products", label: "产品中心" },
  { href: "/blog", label: "博客" },
  { href: "/knowledge", label: "知识库" },
  { href: "/knowledge/search", label: "知识检索" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
            M
          </div>
          <span className="text-xl font-bold">MyApp</span>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            管理后台
          </Link>
          <Link
            href="/request"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            提交需求
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="切换菜单"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 移动端导航菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request"
              className="block text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              提交需求
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
