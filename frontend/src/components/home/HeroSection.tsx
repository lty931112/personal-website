"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";

/**
 * Hero 区域组件
 * 斜切分屏设计：左侧头像 + 右侧个人信息
 */

/* 统计数据 */
const stats = [
  { value: "5+", label: "年经验" },
  { value: "50+", label: "完成项目" },
  { value: "100+", label: "技术文章" },
  { value: "1000+", label: "知识条目" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 左侧：头像区域（约55%宽度） */}
      <div
        className="absolute inset-0 z-0"
        style={{ width: "55%", clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
      >
        <Image
          src="/avatar.png"
          alt="刘桐宇头像"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 右侧：深紫色渐变区域（约45%宽度） */}
      <div
        className="absolute top-0 right-0 bottom-0 z-10 flex flex-col justify-center"
        style={{
          width: "55%",
          left: "45%",
          background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        {/* 导航：左上角汉堡菜单 */}
        <button
          className="absolute top-6 left-8 z-20 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="打开菜单"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* 个人信息内容 */}
        <div className="px-8 md:px-16 lg:px-20">
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

          {/* 联系按钮 */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            联系我
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 底部统计数据 */}
        <div className="mt-auto px-8 md:px-16 lg:px-20 pb-10">
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 backdrop-blur-sm px-3 py-4 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-white/60 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
