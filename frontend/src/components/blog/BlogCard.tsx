import Link from "next/link";

/**
 * 博客卡片组件
 * 在博客列表页中展示单篇博客文章摘要
 */

interface BlogCardProps {
  /** 文章 slug（URL 标识） */
  slug: string;
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  excerpt: string;
  /** 发布日期 */
  date: string;
  /** 所属分类 */
  category: string;
  /** 标签列表 */
  tags: string[];
  /** 封面图片 URL */
  coverImage: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  date,
  category,
  tags,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* 封面图 */}
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">封面图片</span>
      </div>

      {/* 文章信息 */}
      <div className="p-5">
        {/* 分类和日期 */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            {category}
          </span>
          <time>{date}</time>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* 摘要 */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {excerpt}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-muted rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
