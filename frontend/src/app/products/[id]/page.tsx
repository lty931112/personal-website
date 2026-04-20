import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Eye, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Metadata } from "next";

/**
 * 产品详情页
 * 根据动态路由参数 [id] 展示单个产品的详细信息
 */

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/* 模拟产品数据 */
const mockProducts: Record<string, {
  title: string;
  description: string;
  content: string;
  techStack: string[];
  features: string[];
  demoUrl?: string;
  sourceUrl?: string;
  viewCount: number;
  createdAt: string;
  category: string;
}> = {
  "1": {
    title: "智能知识库系统",
    description: "基于 MAGMA 多图记忆架构的智能知识检索系统，支持语义、时序、因果、实体四维检索。",
    content: `## 项目背景

在信息爆炸的时代，如何高效地管理和检索知识成为了企业面临的重要挑战。传统的关键词搜索已经无法满足用户对语义理解和智能推理的需求。

## 技术架构

### 前端技术
- **Next.js 15** - React 全栈框架，支持 SSR/SSG
- **shadcn/ui** - 现代化 UI 组件库
- **Tailwind CSS** - 原子化 CSS 框架
- **Framer Motion** - 动画库

### 后端技术
- **Spring Boot 3.4** - Java Web 框架
- **MyBatis-Plus** - ORM 框架
- **Spring Security** - 安全框架
- **PostgreSQL** - 关系型数据库

### AI 技术栈
- **MAGMA** - 多图记忆架构
- **BGE-M3** - 文本向量化模型
- **Milvus** - 向量数据库

## 核心功能

1. **智能检索** - 基于查询意图自适应选择检索策略
2. **知识管理** - 支持分类、标签、关系维护
3. **实时协作** - 多人同时编辑知识条目
4. **版本管理** - 知识条目修改历史追踪`,
    techStack: ["Next.js", "Spring Boot", "MAGMA", "PostgreSQL", "Milvus", "Redis"],
    features: [
      "四维智能检索（语义/时序/因果/实体）",
      "自适应查询意图路由",
      "知识图谱可视化",
      "批量导入导出",
      "AI 自动摘要生成",
      "全文搜索 + 向量搜索混合检索",
    ],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    viewCount: 1250,
    createdAt: "2025-01-15",
    category: "人工智能",
  },
};

/* 生成静态路径参数 */
export function generateStaticParams() {
  return Object.keys(mockProducts).map((id) => ({ id }));
}

/* 生成动态元数据 */
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts[id];
  if (!product) {
    return { title: "产品未找到" };
  }
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = mockProducts[id];

  // 产品不存在
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <span className="text-6xl mb-4 block">😕</span>
        <h1 className="text-2xl font-bold mb-4">产品未找到</h1>
        <p className="text-muted-foreground mb-6">该产品可能已被移除或链接无效</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回作品列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 面包屑导航 */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">首页</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">作品展示</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* 产品头部信息 */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* 左侧：产品封面 */}
            <div className="lg:col-span-2">
              <SpotlightCard>
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-xl flex items-center justify-center">
                  <span className="text-8xl opacity-40">🚀</span>
                </div>
              </SpotlightCard>
            </div>

            {/* 右侧：产品信息 */}
            <div className="lg:col-span-3">
              {/* 分类和日期 */}
              <div className="flex items-center gap-3 mb-4">
                <Badge>{product.category}</Badge>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {product.createdAt}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {product.viewCount} 次浏览
                </span>
              </div>

              {/* 标题 */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

              {/* 描述 */}
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* 技术栈 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm font-normal px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-3">
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                  >
                    <ExternalLink className="h-4 w-4" />
                    在线演示
                  </a>
                )}
                {product.sourceUrl && (
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    查看源码
                  </a>
                )}
                <Link
                  href="/request"
                  className="inline-flex items-center gap-2 px-6 py-3 text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
                >
                  咨询合作
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品特点 */}
      <section className="py-10 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">核心特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feature, index) => (
              <SpotlightCard key={index}>
                <div className="p-5 bg-card rounded-xl border h-full">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-sm font-medium">{feature}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 详细内容 */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">项目详情</h2>
          {/* Markdown 内容渲染区域（后续接入 Markdown 渲染器） */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {product.content.split("\n").map((line, index) => {
              if (line.startsWith("## ")) {
                return <h2 key={index} className="text-xl font-bold mt-8 mb-4">{line.replace("## ", "")}</h2>;
              }
              if (line.startsWith("### ")) {
                return <h3 key={index} className="text-lg font-semibold mt-6 mb-3">{line.replace("### ", "")}</h3>;
              }
              if (line.startsWith("- **")) {
                const match = line.match(/^- \*\*(.+?)\*\*\s*[-–]?\s*(.*)/);
                if (match) {
                  return (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="text-primary mt-1">•</span>
                      <p><strong>{match[1]}</strong> {match[2]}</p>
                    </div>
                  );
                }
              }
              if (line.startsWith("- ")) {
                return (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <span className="text-primary mt-1">•</span>
                    <p>{line.replace("- ", "")}</p>
                  </div>
                );
              }
              if (line.match(/^\d+\.\s/)) {
                return (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <span className="text-primary font-medium">{line.match(/^(\d+)\./)?.[1]}.</span>
                    <p>{line.replace(/^\d+\.\s/, "")}</p>
                  </div>
                );
              }
              if (line.trim() === "") return <br key={index} />;
              return <p key={index} className="mb-2 leading-relaxed">{line}</p>;
            })}
          </div>
        </div>
      </section>

      {/* 返回按钮 */}
      <section className="py-8 px-4 border-t">
        <div className="container mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回作品列表
          </Link>
        </div>
      </section>
    </div>
  );
}
