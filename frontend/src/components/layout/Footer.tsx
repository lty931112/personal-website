import Link from "next/link";

/**
 * 页脚组件
 * 包含网站信息、快速链接、联系方式和版权声明
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="h-9 w-9 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25">
                L
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">刘桐宇</span>
                <span className="text-[10px] text-muted-foreground leading-tight">Full Stack Developer</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              全栈开发者，专注于 Web 开发和人工智能应用。
              热爱技术，乐于分享，持续成长。
            </p>
            {/* 社交链接 */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/lty931112"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="mailto:17640057438@163.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="邮箱"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  作品展示
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  技术博客
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-foreground transition-colors">
                  知识库
                </Link>
              </li>
              <li>
                <Link href="/knowledge/search" className="hover:text-foreground transition-colors">
                  知识检索
                </Link>
              </li>
            </ul>
          </div>

          {/* 服务 */}
          <div>
            <h3 className="font-semibold mb-4">服务</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/request" className="hover:text-foreground transition-colors">
                  提交需求
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-foreground transition-colors">
                  技术咨询
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-foreground transition-colors">
                  项目合作
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="font-semibold mb-4">联系我</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                17640057438@163.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                中国
              </li>
            </ul>
          </div>
        </div>

        {/* 版权声明 */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} 刘桐宇. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-foreground transition-colors">
              管理后台
            </Link>
            <span className="text-border">|</span>
            <span>Powered by Next.js & Spring Boot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
