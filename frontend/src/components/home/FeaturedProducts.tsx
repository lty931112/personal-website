"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlipCard } from "@/components/ui/flip-card";
import { AutoScroll } from "@/components/ui/auto-scroll";

/**
 * 精选产品展示 - 横向自动滚动
 */

const featuredProducts = [
  {
    id: 1,
    title: "智能知识库系统",
    description: "基于 MAGMA 多图记忆架构的智能知识检索系统，支持语义、时序、因果、实体四维检索。",
    coverEmoji: "🧠",
    coverGradient: "from-indigo-500/20 via-purple-500/10 to-blue-500/20",
    tags: ["Next.js", "Spring Boot", "MAGMA", "向量检索"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
  },
  {
    id: 2,
    title: "企业级后台管理",
    description: "基于 React + Ant Design 的企业级后台管理系统，支持权限管理、数据可视化、工作流引擎。",
    coverEmoji: "📊",
    coverGradient: "from-violet-500/20 via-fuchsia-500/10 to-pink-500/20",
    tags: ["React", "Ant Design", "Node.js", "MongoDB"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
  },
  {
    id: 3,
    title: "AI 写作助手",
    description: "基于大语言模型的智能写作助手，支持文章生成、润色、翻译、摘要等功能。",
    coverEmoji: "✍️",
    coverGradient: "from-pink-500/20 via-rose-500/10 to-orange-500/20",
    tags: ["Python", "FastAPI", "LLM", "RAG"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
  },
];

const glassStyle = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.4)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
};

function ProductCard({ product }: { product: typeof featuredProducts[0] }) {
  return (
    <div className="shrink-0 w-[320px]">
      <FlipCard className="rounded-xl" style={glassStyle}
        front={
          <div className="p-6 h-full flex flex-col" style={{ minHeight: "280px" }}>
            <h3 className="text-xl font-bold mb-3 text-slate-800">{product.title}</h3>
            <p className="text-sm text-slate-600 mb-5 flex-grow line-clamp-3">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/50">
              <a href={product.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-indigo-500 hover:underline">
                <ExternalLink className="h-3.5 w-3.5" />在线演示
              </a>
              <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-foreground">
                <Github className="h-3.5 w-3.5" />源码
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">悬停查看效果图 →</p>
          </div>
        }
        back={
          <Link href={`/products/${product.id}`} className="block h-full">
            <div className={`h-full bg-gradient-to-br ${product.coverGradient} flex flex-col items-center justify-center p-8`} style={{ minHeight: "280px" }}>
              <span className="text-8xl mb-6">{product.coverEmoji}</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{product.title}</h3>
              <p className="text-sm text-slate-500 mb-6">点击查看详情</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </Link>
        }
      />
    </div>
  );
}

export function FeaturedProducts() {
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
            <h2 className="text-3xl font-bold mb-2">精选作品</h2>
            <p className="text-slate-600">我参与开发的一些代表性项目</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex items-center gap-1 text-sm text-slate-500 hover:text-foreground transition-colors">
            查看全部作品 <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* 横向自动滚动 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AutoScroll speed={35} className="py-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="pr-6">
                <ProductCard product={product} />
              </div>
            ))}
          </AutoScroll>
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-foreground transition-colors">
            查看全部作品 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
