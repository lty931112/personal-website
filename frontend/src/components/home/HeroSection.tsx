import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero 区域组件
 * 首页顶部的全屏横幅，展示核心价值主张和行动号召
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          用技术驱动
          <span className="text-primary"> 业务增长</span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          我们提供专业的产品解决方案和技术服务，帮助企业实现数字化转型，
          提升运营效率和用户体验。
        </p>

        {/* 行动按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg text-lg hover:bg-primary/90 transition-colors"
          >
            探索产品
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 border rounded-lg text-lg hover:bg-accent transition-colors"
          >
            阅读博客
          </Link>
        </div>

        {/* 装饰元素 */}
        <div className="mt-16 flex justify-center gap-8 text-muted-foreground">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">500+</p>
            <p className="text-sm">企业客户</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">99.9%</p>
            <p className="text-sm">服务可用性</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">24/7</p>
            <p className="text-sm">技术支持</p>
          </div>
        </div>
      </div>
    </section>
  );
}
