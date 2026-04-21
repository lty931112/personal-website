"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestPosts } from "@/components/home/LatestPosts";
import { SkillsSection } from "@/components/home/SkillsSection";
import { MagicBackground } from "@/components/ui/magic-background";
import { MagicCard } from "@/components/ui/magic-card";
import { RibbonTrail } from "@/components/ui/ribbon-trail";
import { RippleClick } from "@/components/ui/ripple-click";
import { SeasonBackground } from "@/components/ui/season-background";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

/**
 * 首页
 * 四季滚动背景 + 鼠标彩色云光效果
 */

const features = [
  {
    icon: Zap,
    title: "高性能",
    description: "采用 Next.js 15 + React 19，支持 SSR/SSG，首屏加载极速体验",
    color: "#6366f1",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "Spring Security + JWT 认证，完善的权限管理和数据保护",
    color: "#8b5cf6",
  },
  {
    icon: Sparkles,
    title: "智能检索",
    description: "基于 MAGMA 多图记忆架构，支持语义、时序、因果、实体四维检索",
    color: "#ec4899",
  },
  {
    icon: Heart,
    title: "用心打造",
    description: "注重细节和用户体验，每一个功能都经过精心设计和打磨",
    color: "#f97316",
  },
];

export default function HomePage() {
  return (
    <SeasonBackground>
      <RippleClick
        colors={["#6366f1", "#8b5cf6", "#ec4899", "#f97316", "#00d8ff", "#7cff67"]}
        maxRadius={120}
        duration={800}
      >
      <RibbonTrail
        colors={["#ff9346", "#7cff67", "#ffee51", "#00d8ff", "#ff6b9d", "#c084fc"]}
        ribbonCount={4}
        dotSize={8}
        maxSpread={4}
        fadeSpeed={0.008}
      >
        <div className="flex flex-col pt-20" style={{ color: "#1e293b" }}>
          {/* Hero 横幅区域 */}
          <HeroSection />

          {/* 精选作品 */}
          <FeaturedProducts />

          {/* 最新文章 */}
          <LatestPosts />

          {/* 技术栈 */}
          <SkillsSection />

          {/* 特色区域 */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4">为什么选择我</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
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
                    <MagicCard
                      className="h-full"
                      gradientSize={300}
                      gradientColor={feature.color}
                      gradientOpacity={0.25}
                    >
                      <div className="p-6 rounded-xl border h-full" style={{
                        background: "rgba(255, 255, 255, 0.6)",
                        borderColor: "rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                          background: `${feature.color}15`,
                        }}>
                          <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-slate-800">{feature.title}</h3>
                        <p className="text-sm text-slate-600">{feature.description}</p>
                      </div>
                    </MagicCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA 区域 */}
          <section className="py-20 px-4">
            <motion.div
              className="container mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                有项目想法？让我们一起实现
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto mb-8">
                无论是产品开发、技术咨询还是技术合作，我都期待与您交流
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/request"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-400 transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  提交需求
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/knowledge"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-100 transition-colors text-slate-700"
                >
                  探索知识库
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </RibbonTrail>
      </RippleClick>
    </SeasonBackground>
  );
}
