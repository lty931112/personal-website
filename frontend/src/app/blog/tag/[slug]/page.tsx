import { BlogCard } from "@/components/blog/BlogCard";

/**
 * 博客标签归档页
 * 根据动态路由参数 [slug] 展示指定标签下的所有文章
 */

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  /* 模拟该标签下的文章数据 */
  const mockPosts = [
    {
      slug: "tagged-post-1",
      title: `标签「${slug}」下的文章 1`,
      excerpt: "这是带有该标签的一篇示例文章摘要。",
      date: "2025-01-15",
      category: "技术",
      tags: [slug],
      coverImage: "/images/blog-1.jpg",
    },
    {
      slug: "tagged-post-2",
      title: `标签「${slug}」下的文章 2`,
      excerpt: "这是带有该标签的另一篇示例文章摘要。",
      date: "2025-01-10",
      category: "教程",
      tags: [slug],
      coverImage: "/images/blog-2.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">标签：{slug}</h1>
        <p className="text-muted-foreground">
          浏览标签「{slug}」下的所有文章。
        </p>
      </div>

      {/* 文章列表 */}
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
    </div>
  );
}
