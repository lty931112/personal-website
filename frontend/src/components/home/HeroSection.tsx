"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero 区域 - 斜切分屏 + 滚动向两边拉开
 * 两个面板都用 fixed 定位，滚动时通过 transform 向两边移开
 * 完全分开后隐藏，不遮挡下方内容
 */

const stats = [
  { value: "5+", label: "年经验" },
  { value: "50+", label: "完成项目" },
  { value: "100+", label: "技术文章" },
  { value: "1000+", label: "知识条目" },
];

export function HeroSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 滚动 0~100vh 对应 progress 0~1
      const p = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.8)));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 左侧向左移，右侧向右移
  const leftTransform = `translateX(${-progress * 55}%)`;
  const rightTransform = `translateX(${progress * 55}%)`;
  // 分开后淡出
  const opacity = Math.max(0, 1 - progress * 1.5);
  const pointerEvents = progress > 0.8 ? "none" : "auto";

  return (
    <>
      {/* 占位高度，让页面可以滚动触发动画 */}
      <div style={{ height: "100vh" }} />

      {/* 左侧：头像 */}
      <div
        className="fixed top-0 left-0 h-screen overflow-hidden"
        style={{
          width: "55%",
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          transform: leftTransform,
          opacity,
          transition: "none",
          zIndex: 20,
          pointerEvents,
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

      {/* 右侧：深紫色渐变 */}
      <div
        className="fixed top-0 right-0 h-screen overflow-hidden"
        style={{
          width: "55%",
          background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
          transform: rightTransform,
          opacity,
          transition: "none",
          zIndex: 20,
          pointerEvents,
        }}
      >
        {/* 个人信息 - 居中 */}
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
          <div className="mt-16 w-full max-w-lg">
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-sm px-2 py-3 text-center">
                  <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
