"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestPosts } from "@/components/home/LatestPosts";
import { SkillsSection } from "@/components/home/SkillsSection";
import { MagicCard } from "@/components/ui/magic-card";
import { RibbonTrail } from "@/components/ui/ribbon-trail";
import { RippleClick } from "@/components/ui/ripple-click";
import { BootAnimation } from "@/components/ui/boot-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

/**
 * 首页
 * 斜切分屏个人介绍 → 滚动分开 → 统计/技术栈 → 卷帘门展开作品文章 → 开机动画CTA
 */

const features = [
  { icon: Zap, title: "高性能", description: "采用 Next.js 15 + React 19，支持 SSR/SSG，首屏加载极速体验", color: "#6366f1" },
  { icon: Shield, title: "安全可靠", description: "Spring Security + JWT 认证，完善的权限管理和数据保护", color: "#8b5cf6" },
  { icon: Sparkles, title: "智能检索", description: "基于 MAGMA 多图记忆架构，支持语义、时序、因果、实体四维检索", color: "#ec4899" },
  { icon: Heart, title: "用心打造", description: "注重细节和用户体验，每一个功能都经过精心设计和打磨", color: "#f97316" },
];

export default function HomePage() {
  return (
    <RippleClick colors={["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#00d8ff", "#7cff67"]} maxRadius={120} duration={800}>
      <RibbonTrail colors={["#ff9346", "#7cff67", "#ffee51", "#00d8ff", "#ff6b9d", "#c084fc"]} ribbonCount={4} dotSize={8} maxSpread={4} fadeSpeed={0.008}>

        {/* 第一屏：斜切分屏个人介绍 */}
        <HeroSection />

        {/* 第二屏：技术栈 + 特色卡片（Hero 滚动拉开后露出） */}
          <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-20" style={{ background: "#f8fafc" }}>
            <div className="container mx-auto max-w-5xl">
              {/* 技术栈 */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-slate-800">技术栈</h2>
                  <p className="text-slate-500">多年开发经验积累的技术能力</p>
                </div>
                <SkillsSection />
              </motion.div>

              {/* 为什么选择我 */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-4 text-slate-800">为什么选择我</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                  专注于技术深度和产品质量，为每一个项目提供最佳解决方案
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MagicCard className="h-full" gradientSize={300} gradientColor={feature.color} gradientOpacity={0.25}>
                      <div className="p-6 rounded-xl border h-full" style={{
                        background: "rgba(255,255,255,0.8)",
                        borderColor: "rgba(0,0,0,0.06)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                      }}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `${feature.color}15` }}>
                          <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </div>
                    </MagicCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

        {/* 第三屏：精选作品 + 最新文章 */}
          <section className="py-20 px-4" style={{ background: "#f8fafc" }}>
            <FeaturedProducts />
            <div className="mt-12">
              <LatestPosts />
            </div>
          </section>

        {/* 第六屏：电脑开机动画 + 提交需求 CTA */}
        <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #f1f5f9, #e2e8f0)" }}>
          <BootAnimation />
        </section>

      </RibbonTrail>
    </RippleClick>
  );
}
