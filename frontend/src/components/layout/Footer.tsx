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
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                M
              </div>
              <span className="text-xl font-bold">MyApp</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              致力于提供最优质的产品和服务，帮助您的业务快速增长。
            </p>
          </div>

          {/* 产品服务 */}
          <div>
            <h3 className="font-semibold mb-4">产品服务</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  产品中心
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-foreground transition-colors">
                  知识库
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-foreground transition-colors">
                  提交需求
                </Link>
              </li>
            </ul>
          </div>

          {/* 内容资源 */}
          <div>
            <h3 className="font-semibold mb-4">内容资源</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/knowledge/search" className="hover:text-foreground transition-colors">
                  知识检索
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-foreground transition-colors">
                  管理后台
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>邮箱：contact@example.com</li>
              <li>电话：400-000-0000</li>
              <li>地址：北京市朝阳区</li>
            </ul>
          </div>
        </div>

        {/* 版权声明 */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
