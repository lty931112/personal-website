import Link from "next/link";

/**
 * 404 页面
 * 当用户访问不存在的路由时显示
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* 404 大字 */}
      <h1 className="text-8xl font-bold text-muted-foreground/30 mb-4">404</h1>

      {/* 提示信息 */}
      <h2 className="text-2xl font-semibold mb-2">页面未找到</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        抱歉，您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页。
      </p>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
        >
          浏览博客
        </Link>
      </div>
    </div>
  );
}
