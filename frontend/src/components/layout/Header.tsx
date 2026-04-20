"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * 顶部导航栏组件
 * 包含 Logo、主导航链接、移动端汉堡菜单
 */

/* 导航链接配置 */
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/products", label: "作品" },
  { href: "/blog", label: "博客" },
  { href: "/knowledge", label: "知识库" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            L
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">刘桐宇</span>
            <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">Full Stack Developer</span>
          </div>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/knowledge/search"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            知识检索
          </Link>
          <Link
            href="/request"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            联系我
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="切换菜单"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* 移动端导航菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2 space-y-1">
              <Link
                href="/knowledge/search"
                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                知识检索
              </Link>
              <Link
                href="/request"
                className="block text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                联系我
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
