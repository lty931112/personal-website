import { BlogCard } from "@/components/blog/BlogCard";

/**
 * 博客列表页
 * 展示所有博客文章，支持分页和分类筛选
 */

/* 模拟博客数据，后续替换为 API 调用 */
const mockPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Next.js 15 入门指南",
    excerpt: "从零开始学习 Next.js 15，掌握 App Router、Server Components 等核心概念。",
    date: "2025-01-15",
    category: "技术教程",
    tags: ["Next.js", "React", "前端"],
    coverImage: "/images/blog-1.jpg",
  },
  {
    slug: "tailwind-css-4-new-features",
    title: "Tailwind CSS 4 新特性一览",
    excerpt: "探索 Tailwind CSS 4 带来的重大更新，包括 CSS-first 配置和全新的引擎。",
    date: "2025-01-10",
    category: "前端技术",
    tags: ["Tailwind CSS", "CSS", "前端"],
    coverImage: "/images/blog-2.jpg",
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript 最佳实践总结",
    excerpt: "总结日常开发中常用的 TypeScript 技巧和最佳实践，提升代码质量。",
    date: "2025-01-05",
    category: "编程语言",
    tags: ["TypeScript", "JavaScript", "编程"],
    coverImage: "/images/blog-3.jpg",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">博客</h1>
        <p className="text-muted-foreground">
          分享技术见解、行业动态和开发经验。
        </p>
      </div>

      {/* 分类标签筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["全部", "技术教程", "前端技术", "编程语言", "行业动态"].map(
          (category) => (
            <button
              key={category}
              className="px-4 py-1.5 rounded-full text-sm border hover:bg-accent transition-colors"
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* 博客文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            category={post.category}
            tags={post.tags}
            coverImage={post.coverImage}
          />
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            上一页
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            下一页
          </button>
        </div>
      </div>
    </div>
  );
}
