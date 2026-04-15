import { TocSidebar } from "@/components/blog/TocSidebar";

/**
 * 博客详情页
 * 根据动态路由参数 [slug] 展示单篇博客文章的完整内容
 */

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">
          首页
        </a>
        <span className="mx-2">/</span>
        <a href="/blog" className="hover:text-foreground">
          博客
        </a>
        <span className="mx-2">/</span>
        <span className="text-foreground">文章详情</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* 文章正文 */}
        <article className="lg:col-span-3">
          {/* 文章头部 */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              文章标题 - {slug}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>2025-01-15</span>
              <span>作者：Admin</span>
              <span>阅读时间：5 分钟</span>
            </div>
            {/* 标签 */}
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Next.js
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                React
              </span>
            </div>
          </header>

          {/* 封面图 */}
          <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center">
            <span className="text-muted-foreground">文章封面图</span>
          </div>

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none">
            <h2>引言</h2>
            <p>
              这是文章的正文内容。在这里展示详细的技术分析、教程步骤或观点论述。
            </p>

            <h2>主要内容</h2>
            <p>
              文章的主要部分，包含代码示例、图表和详细说明。支持 Markdown 格式渲染。
            </p>

            <h3>子章节</h3>
            <p>更细粒度的内容组织，帮助读者快速定位感兴趣的内容。</p>

            <h2>总结</h2>
            <p>
              文章总结部分，回顾要点并给出后续建议。
            </p>
          </div>

          {/* 评论区占位 */}
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">评论</h2>
            <p className="text-muted-foreground">评论功能开发中...</p>
          </section>
        </article>

        {/* 目录侧边栏 */}
        <aside className="hidden lg:block">
          <TocSidebar
            headings={[
              { id: "introduction", text: "引言", level: 2 },
              { id: "main-content", text: "主要内容", level: 2 },
              { id: "sub-section", text: "子章节", level: 3 },
              { id: "summary", text: "总结", level: 2 },
            ]}
          />
        </aside>
      </div>
    </div>
  );
}
