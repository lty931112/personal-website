import { HeroSection } from "@/components/home/HeroSection";
import { LatestPosts } from "@/components/home/LatestPosts";

/**
 * 首页
 * 包含 Hero 区域和最新动态展示
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero 横幅区域 */}
      <HeroSection />

      {/* 最新动态 / 产品推荐 */}
      <LatestPosts />

      {/* 特色区域 */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">为什么选择我们</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            我们致力于提供最优质的产品和服务，帮助您的业务快速增长。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "专业团队",
                desc: "拥有多年行业经验的精英团队",
              },
              {
                title: "技术创新",
                desc: "持续跟进前沿技术，保持竞争力",
              },
              {
                title: "贴心服务",
                desc: "7x24 小时全天候技术支持",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-card rounded-lg border shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
