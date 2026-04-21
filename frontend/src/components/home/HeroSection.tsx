"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero 区域 - 斜切分屏 + 滚动向两边拉开
 * 左侧头像，右侧紫色渐变个人信息
 * 向下滚动时，图片和紫色块分别向左右两边拉开
 */

const stats = [
  { value: "5+", label: "年经验" },
  { value: "50+", label: "完成项目" },
  { value: "100+", label: "技术文章" },
  { value: "1000+", label: "知识条目" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // 滚动进度：从 0 到 1（section 顶部离开视口底部到完全离开）
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.8)));
      setSplit(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 分开距离（px）
  const gap = split * 60;

  return (
    <section ref={sectionRef} className="relative" style={{ minHeight: `${100 + split * 20}vh` }}>
      {/* 左侧：头像区域 */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          width: `calc(55% - ${gap}px)`,
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          transition: "width 0.1s linear",
        }}
      >
        <Image
          src="/avatar.png"
          alt="刘桐宇头像"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 右侧：深紫色渐变区域 */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: `calc(55% - ${gap}px)`,
          background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
          transition: "width 0.1s linear",
          zIndex: 10,
        }}
      >
        {/* 个人信息内容 - 垂直水平居中 */}
        <div className="h-full flex flex-col items-center justify-center text-center px-8 md:px-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            刘桐宇
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-6">
            全栈开发者 · 技术博主
          </p>

          <p className="text-base md:text-lg text-white/60 max-w-md mb-8 leading-relaxed">
            热爱技术，专注于 Web 全栈开发和人工智能应用。
            善于将复杂的技术问题转化为优雅的解决方案，
            致力于打造高质量的产品和分享有价值的技术内容。
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            联系我
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* 底部统计数据 */}
          <div className="mt-16 w-full max-w-lg">
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 backdrop-blur-sm px-2 py-3 text-center"
                >
                  <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
