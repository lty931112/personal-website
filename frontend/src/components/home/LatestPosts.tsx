import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 最新动态组件
 * 首页展示最新的博客文章和产品更新
 */

/* 模拟最新文章数据 */
const latestPosts = [
  {
    slug: "nextjs-15-release",
    title: "Next.js 15 正式发布",
    excerpt: "带来全新的性能优化和开发体验提升。",
    date: "2025-01-15",
    category: "技术动态",
  },
  {
    slug: "product-update-v2",
    title: "产品 v2.0 重大更新",
    excerpt: "新增多项功能，全面升级用户体验。",
    date: "2025-01-10",
    category: "产品更新",
  },
  {
    slug: "team-growth",
    title: "团队扩展计划",
    excerpt: "我们正在招募优秀人才，加入我们的团队。",
    date: "2025-01-05",
    category: "公司动态",
  },
];

export function LatestPosts() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">最新动态</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 bg-card rounded-lg border hover:shadow-md transition-shadow"
            >
              {/* 分类标签 */}
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>

              {/* 标题 */}
              <h3 className="text-lg font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              {/* 摘要 */}
              <p className="text-sm text-muted-foreground mb-4">
                {post.excerpt}
              </p>

              {/* 日期 */}
              <time className="text-xs text-muted-foreground">{post.date}</time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
