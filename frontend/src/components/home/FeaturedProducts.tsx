"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * 最新产品展示组件
 * 首页展示最新的产品/项目
 */

/* 模拟产品数据 */
const featuredProducts = [
  {
    id: 1,
    title: "智能知识库系统",
    description: "基于 MAGMA 多图记忆架构的智能知识检索系统，支持语义、时序、因果、实体四维检索。",
    coverImage: "/images/products/knowledge-system.png",
    tags: ["Next.js", "Spring Boot", "MAGMA", "向量检索"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    featured: true,
  },
  {
    id: 2,
    title: "企业级后台管理",
    description: "基于 React + Ant Design 的企业级后台管理系统，支持权限管理、数据可视化、工作流引擎。",
    coverImage: "/images/products/admin-dashboard.png",
    tags: ["React", "Ant Design", "Node.js", "MongoDB"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    featured: true,
  },
  {
    id: 3,
    title: "AI 写作助手",
    description: "基于大语言模型的智能写作助手，支持文章生成、润色、翻译、摘要等功能。",
    coverImage: "/images/products/ai-writer.png",
    tags: ["Python", "FastAPI", "LLM", "RAG"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    featured: true,
  },
];

/* 动画配置 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-muted/30">
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
            <h2 className="text-3xl font-bold mb-2">精选作品</h2>
            <p className="text-muted-foreground">
              我参与开发的一些代表性项目
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部作品
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* 产品卡片 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="group relative bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300"
              variants={cardVariants}
            >
              {/* 封面图 */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-6xl opacity-50">🚀</span>
              </div>

              {/* 内容 */}
              <div className="p-5">
                {/* 标题 */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>

                {/* 描述 */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 链接 */}
                <div className="flex items-center gap-3 pt-3 border-t">
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    在线演示
                  </a>
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" />
                    源码
                  </a>
                </div>
              </div>

              {/* Hover 效果 */}
              <Link
                href={`/products/${product.id}`}
                className="absolute inset-0"
                aria-label={`查看 ${product.title} 详情`}
              >
                <span className="sr-only">查看详情</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 移动端查看全部 */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部作品
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
