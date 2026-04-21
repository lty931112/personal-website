"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { FlipCard } from "@/components/ui/flip-card";

/**
 * 最新文章 - 横向自动滚动（反向）
 */

const latestPosts = [
  {
    slug: "nextjs-15-app-router-guide",
    title: "Next.js 15 App Router 完全指南",
    excerpt: "深入探索 Next.js 15 的 App Router 架构，包括服务端组件、流式渲染、路由组等核心特性。",
    date: "2025-01-15",
    category: "前端开发",
    readTime: "10 分钟",
    coverEmoji: "⚡",
    coverGradient: "from-amber-400/20 via-orange-400/10 to-yellow-400/20",
  },
  {
    slug: "spring-boot-3-best-practices",
    title: "Spring Boot 3 最佳实践总结",
    excerpt: "总结 Spring Boot 3 开发中的最佳实践，包括配置管理、异常处理、性能优化等方面。",
    date: "2025-01-10",
    category: "后端开发",
    readTime: "15 分钟",
    coverEmoji: "🌿",
    coverGradient: "from-green-500/20 via-emerald-500/10 to-teal-500/20",
  },
  {
    slug: "magma-knowledge-retrieval",
    title: "MAGMA：下一代知识检索架构",
    excerpt: "介绍基于多图记忆架构的智能检索系统，支持语义、时序、因果、实体四维检索。",
    date: "2025-01-05",
    category: "人工智能",
    readTime: "20 分钟",
    coverEmoji: "🤖",
    coverGradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
  },
];

const glassStyle = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.4)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
};

function PostCard({ post }: { post: typeof latestPosts[0] }) {
  return (
    <div className="w-full">
      <FlipCard className="rounded-xl" style={glassStyle}
        front={
          <div className="p-6 h-full flex flex-col" style={{ minHeight: "200px" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-indigo-500/10 text-indigo-600 font-medium">
                <Tag className="h-3 w-3" />{post.category}
              </span>
              <span className="text-xs text-slate-500">{post.readTime}</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-slate-800 line-clamp-2">{post.title}</h3>
            <p className="text-sm text-slate-600 mb-5 flex-grow line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              <time>{post.date}</time>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">悬停查看效果图 →</p>
          </div>
        }
        back={
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <div className={`h-full bg-gradient-to-br ${post.coverGradient} flex flex-col items-center justify-center p-8`} style={{ minHeight: "200px" }}>
              <span className="text-8xl mb-6">{post.coverEmoji}</span>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{post.category} · {post.readTime}</p>
              <span className="text-xs text-slate-400">点击阅读全文 →</span>
            </div>
          </Link>
        }
      />
    </div>
  );
}

export function LatestPosts() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">最新文章</h2>
            <p className="text-slate-600">分享技术心得和行业洞察</p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-1 text-sm text-slate-500 hover:text-foreground transition-colors">
            查看全部文章 <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-foreground transition-colors">
            查看全部文章 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
