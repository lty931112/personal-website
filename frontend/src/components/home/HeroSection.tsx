"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, Linkedin } from "lucide-react";

/**
 * Hero 区域组件
 * 首页顶部的全屏横幅，展示个人品牌和核心价值主张
 */

/* 社交链接配置 */
const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "mailto:contact@example.com", icon: Mail, label: "邮箱" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
];

/* 统计数据 */
const stats = [
  { value: "5+", label: "年开发经验" },
  { value: "50+", label: "完成项目" },
  { value: "100+", label: "技术文章" },
  { value: "1000+", label: "知识条目" },
];

/* 动画配置 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 左侧：文字内容 */}
          <div className="flex-1 text-center lg:text-left">
            {/* 问候语 */}
            <motion.p
              className="text-primary font-medium mb-4"
              variants={itemVariants}
            >
              👋 你好，我是
            </motion.p>

            {/* 姓名 */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              variants={itemVariants}
            >
              刘桐宇
            </motion.h1>

            {/* 职位/身份 */}
            <motion.h2
              className="text-xl md:text-2xl text-muted-foreground mb-6"
              variants={itemVariants}
            >
              全栈开发者 · 技术博主 · 终身学习者
            </motion.h2>

            {/* 简介 */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0"
              variants={itemVariants}
            >
              热爱技术，专注于 Web 全栈开发和人工智能应用。
              善于将复杂的技术问题转化为优雅的解决方案，
              致力于打造高质量的产品和分享有价值的技术内容。
            </motion.p>

            {/* 行动按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
              variants={itemVariants}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                查看作品
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                阅读博客
              </Link>
              <Link
                href="/request"
                className="inline-flex items-center gap-2 px-6 py-3 text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
              >
                联系我
              </Link>
            </motion.div>

            {/* 社交链接 */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* 右侧：头像/装饰 */}
          <motion.div
            className="flex-shrink-0"
            variants={itemVariants}
          >
            <div className="relative">
              {/* 头像容器 */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary to-primary/50 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl md:text-8xl">
                  👨‍💻
                </div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl animate-bounce">
                ⚡
              </div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-xl">
                ✨
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-lg bg-card/50 border"
              variants={itemVariants}
              custom={index}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
