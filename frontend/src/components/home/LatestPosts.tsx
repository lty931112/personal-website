"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";

/**
 * 最新动态组件
 * 首页展示最新的博客文章和产品更新
 */

/* 模拟最新文章数据 */
const latestPosts = [
  {
    slug: "nextjs-15-app-router-guide",
    title: "Next.js 15 App Router 完全指南",
    excerpt: "深入探索 Next.js 15 的 App Router 架构，包括服务端组件、流式渲染、路由组等核心特性。",
    date: "2025-01-15",
    category: "前端开发",
    readTime: "10 分钟",
    coverImage: "/images/blog/nextjs-15.png",
  },
  {
    slug: "spring-boot-3-best-practices",
    title: "Spring Boot 3 最佳实践总结",
    excerpt: "总结 Spring Boot 3 开发中的最佳实践，包括配置管理、异常处理、性能优化等方面。",
    date: "2025-01-10",
    category: "后端开发",
    readTime: "15 分钟",
    coverImage: "/images/blog/spring-boot.png",
  },
  {
    slug: "magma-knowledge-retrieval",
    title: "MAGMA：下一代知识检索架构",
    excerpt: "介绍基于多图记忆架构的智能检索系统，支持语义、时序、因果、实体四维检索。",
    date: "2025-01-05",
    category: "人工智能",
    readTime: "20 分钟",
    coverImage: "/images/blog/magma.png",
  },
];

/* 动画配置 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function LatestPosts() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* 标题栏 */}
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">最新文章</h2>
            <p className="text-muted-foreground">
              分享技术心得和行业洞察
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部文章
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* 文章列表 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {latestPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={cardVariants}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-card rounded-xl border overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                {/* 封面图 */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📝</span>
                </div>

                {/* 内容 */}
                <div className="p-5">
                  {/* 分类和阅读时间 */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* 摘要 */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* 日期 */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time>{post.date}</time>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 移动端查看全部 */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部文章
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
