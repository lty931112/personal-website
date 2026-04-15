import Link from "next/link";

/**
 * 管理后台布局
 * 独立于前台布局，提供侧边栏导航和顶部工具栏
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* 侧边栏 */}
      <aside className="w-64 bg-card border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">管理后台</h1>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/admin", label: "仪表盘", icon: "📊" },
            { href: "/admin/products", label: "产品管理", icon: "📦" },
            { href: "/admin/blog", label: "博客管理", icon: "📝" },
            { href: "/admin/knowledge", label: "知识库管理", icon: "📚" },
            { href: "/admin/requests", label: "需求管理", icon: "📋" },
            { href: "/admin/users", label: "用户管理", icon: "👥" },
            { href: "/admin/settings", label: "系统设置", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 返回前台 */}
        <div className="p-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
          >
            <span>🏠</span>
            <span>返回前台</span>
          </Link>
        </div>
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部工具栏 */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-6">
          <div className="text-sm text-muted-foreground">欢迎回来，管理员</div>
          <div className="flex items-center gap-4">
            <button className="text-sm hover:text-foreground transition-colors">
              通知
            </button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
              A
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}
