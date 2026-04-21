"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * 顶部导航栏 - Inspira UI 风格
 * Logo 左侧 + 导航居中 + 右侧 CTA 按钮
 * 透明背景 + 毛玻璃效果
 */

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-4 mt-4 rounded-2xl border border-white/20 px-6 py-3"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
              }}
            >
              L
            </div>
            <span className="text-base font-bold text-slate-800 hidden sm:block">刘桐宇</span>
          </Link>

          {/* 桌面端导航 - 居中 */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-slate-800"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                style={
                  isActive(link.href)
                    ? { background: "rgba(99, 102, 241, 0.1)", borderRadius: "9999px" }
                    : {}
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 右侧按钮 */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/knowledge/search"
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              知识检索
            </Link>
            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "9999px",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
              }}
            >
              联系我
              <span className="text-xs">→</span>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-700" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200/50">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-slate-800 bg-indigo-500/10"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                  style={{ borderRadius: "9999px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-200/50 space-y-1">
                <Link
                  href="/knowledge/search"
                  className="block px-4 py-2.5 text-sm text-slate-500 hover:text-slate-800 hover:bg-white/50 transition-colors"
                  style={{ borderRadius: "9999px" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  知识检索
                </Link>
                <Link
                  href="/request"
                  className="block text-center px-4 py-2.5 text-sm font-medium text-white transition-colors"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    borderRadius: "9999px",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  联系我 →
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
