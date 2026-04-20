"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Product, ProductCategory } from "@/types/product";

/**
 * 产品列表页
 * 展示所有产品，支持搜索、分类筛选和排序
 */

/* 模拟产品数据 */
const mockProducts: Product[] = [
  {
    id: 1,
    title: "智能知识库系统",
    description: "基于 MAGMA 多图记忆架构的智能知识检索系统，支持语义、时序、因果、实体四维检索。",
    content: "## 项目介绍\n\n基于 MAGMA 多图记忆架构的智能知识检索系统...",
    coverImage: "",
    categoryId: 1,
    category: { id: 1, name: "人工智能", slug: "ai" },
    techStack: ["Next.js", "Spring Boot", "MAGMA", "PostgreSQL", "Milvus"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    status: "published",
    sortOrder: 1,
    viewCount: 1250,
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: 2,
    title: "企业级后台管理系统",
    description: "基于 React + Ant Design 的企业级后台管理系统，支持权限管理、数据可视化、工作流引擎。",
    content: "## 项目介绍\n\n企业级后台管理系统...",
    coverImage: "",
    categoryId: 2,
    category: { id: 2, name: "Web 应用", slug: "web-app" },
    techStack: ["React", "Ant Design", "Node.js", "MongoDB", "Redis"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    status: "published",
    sortOrder: 2,
    viewCount: 980,
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: 3,
    title: "AI 写作助手",
    description: "基于大语言模型的智能写作助手，支持文章生成、润色、翻译、摘要等功能。",
    content: "## 项目介绍\n\nAI 写作助手...",
    coverImage: "",
    categoryId: 1,
    category: { id: 1, name: "人工智能", slug: "ai" },
    techStack: ["Python", "FastAPI", "LangChain", "OpenAI", "React"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "https://github.com",
    status: "published",
    sortOrder: 3,
    viewCount: 860,
    createdAt: "2025-01-05T00:00:00Z",
    updatedAt: "2025-01-05T00:00:00Z",
  },
  {
    id: 4,
    title: "实时协作白板",
    description: "支持多人实时协作的在线白板工具，基于 WebSocket 和 Canvas 实现。",
    content: "## 项目介绍\n\n实时协作白板...",
    coverImage: "",
    categoryId: 2,
    category: { id: 2, name: "Web 应用", slug: "web-app" },
    techStack: ["Next.js", "WebSocket", "Canvas", "Redis", "PostgreSQL"],
    demoUrl: "https://demo.example.com",
    sourceUrl: "",
    status: "published",
    sortOrder: 4,
    viewCount: 720,
    createdAt: "2024-12-20T00:00:00Z",
    updatedAt: "2024-12-20T00:00:00Z",
  },
  {
    id: 5,
    title: "微服务网关",
    description: "高性能 API 网关，支持限流、熔断、负载均衡、灰度发布等功能。",
    content: "## 项目介绍\n\n微服务网关...",
    coverImage: "",
    categoryId: 3,
    category: { id: 3, name: "后端工具", slug: "backend-tool" },
    techStack: ["Java", "Spring Cloud Gateway", "Redis", "Nacos", "Docker"],
    demoUrl: "",
    sourceUrl: "https://github.com",
    status: "published",
    sortOrder: 5,
    viewCount: 650,
    createdAt: "2024-12-15T00:00:00Z",
    updatedAt: "2024-12-15T00:00:00Z",
  },
  {
    id: 6,
    title: "智能客服机器人",
    description: "基于 RAG 技术的智能客服系统，支持多轮对话、知识库问答、工单创建。",
    content: "## 项目介绍\n\n智能客服机器人...",
    coverImage: "",
    categoryId: 1,
    category: { id: 1, name: "人工智能", slug: "ai" },
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Vue.js"],
    demoUrl: "",
    sourceUrl: "",
    status: "draft",
    sortOrder: 6,
    viewCount: 320,
    createdAt: "2024-12-10T00:00:00Z",
    updatedAt: "2024-12-10T00:00:00Z",
  },
];

/* 模拟分类数据 */
const mockCategories: ProductCategory[] = [
  { id: 0, name: "全部", slug: "all", productCount: 6 },
  { id: 1, name: "人工智能", slug: "ai", productCount: 3 },
  { id: 2, name: "Web 应用", slug: "web-app", productCount: 2 },
  { id: 3, name: "后端工具", slug: "backend-tool", productCount: 1 },
];

/* 排序选项 */
const sortOptions = [
  { value: "sortOrder", label: "默认排序" },
  { value: "createdAt", label: "最新发布" },
  { value: "viewCount", label: "最多浏览" },
];

export default function ProductsPage() {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [sortBy, setSortBy] = useState("sortOrder");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* 筛选和排序逻辑 */
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // 关键词搜索
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw) ||
          p.techStack.some((t) => t.toLowerCase().includes(kw))
      );
    }

    // 分类筛选
    if (activeCategory !== 0) {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    // 只显示已发布
    result = result.filter((p) => p.status === "published");

    // 排序
    result.sort((a, b) => {
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "viewCount") {
        return b.viewCount - a.viewCount;
      }
      return a.sortOrder - b.sortOrder;
    });

    return result;
  }, [keyword, activeCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* 页面头部 */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">作品展示</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              我参与开发的项目和作品，涵盖 Web 应用、人工智能、后端工具等多个领域
            </p>
          </motion.div>
        </div>
      </section>

      {/* 筛选和搜索栏 */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* 搜索框 */}
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索项目名称、技术栈..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden md:block" />
              {mockCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 text-xs opacity-70">({cat.productCount})</span>
                </button>
              ))}
            </div>

            {/* 排序和视图切换 */}
            <div className="flex items-center gap-2 md:ml-auto">
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-8 pr-8 py-1.5 text-sm border rounded-lg bg-background appearance-none cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 transition-colors ${
                    viewMode === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="网格视图"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 transition-colors ${
                    viewMode === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="列表视图"
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {/* 结果统计 */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              共找到 <span className="text-foreground font-medium">{filteredProducts.length}</span> 个项目
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            /* 空状态 */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold mb-2">没有找到匹配的项目</h3>
              <p className="text-muted-foreground mb-6">试试调整搜索关键词或筛选条件</p>
              <button
                onClick={() => {
                  setKeyword("");
                  setActiveCategory(0);
                }}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                清除筛选
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
