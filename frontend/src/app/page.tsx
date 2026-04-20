"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestPosts } from "@/components/home/LatestPosts";
import { SkillsSection } from "@/components/home/SkillsSection";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

/**
 * 首页
 * 包含 Hero 区域、精选作品、最新文章、技术栈、特色展示
 */

/* 特色功能数据 */
const features = [
  {
    icon: Zap,
    title: "高性能",
    description: "采用 Next.js 15 + React 19，支持 SSR/SSG，首屏加载极速体验",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "Spring Security + JWT 认证，完善的权限管理和数据保护",
  },
  {
    icon: Sparkles,
    title: "智能检索",
    description: "基于 MAGMA 多图记忆架构，支持语义、时序、因果、实体四维检索",
  },
  {
    icon: Heart,
    title: "用心打造",
    description: "注重细节和用户体验，每一个功能都经过精心设计和打磨",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero 横幅区域 - 带聚光灯背景 */}
      <SpotlightBackground spotlightSize={800} spotlightColor="rgba(59, 130, 246, 0.08)">
        <HeroSection />
      </SpotlightBackground>

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
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                <SpotlightCard className="h-full">
                  <div className="p-6 bg-card rounded-xl border h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10">
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
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            无论是产品开发、技术咨询还是技术合作，我都期待与您交流
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              提交需求
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 px-8 py-3 border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              探索知识库
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
