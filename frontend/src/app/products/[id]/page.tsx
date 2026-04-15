/**
 * 产品详情页
 * 根据动态路由参数 [id] 展示单个产品的详细信息
 */

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <nav className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-foreground">
          首页
        </a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-foreground">
          产品中心
        </a>
        <span className="mx-2">/</span>
        <span className="text-foreground">产品详情</span>
      </nav>

      {/* 产品信息区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 产品图片 */}
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">产品图片 (ID: {id})</span>
        </div>

        {/* 产品详情 */}
        <div>
          <h1 className="text-3xl font-bold mb-4">产品名称 - {id}</h1>
          <p className="text-2xl font-semibold text-primary mb-6">¥999</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            这是产品的详细描述。在这里展示产品的功能特点、技术参数、使用场景等信息。
            产品采用先进的技术架构，具有出色的性能和稳定性。
          </p>

          {/* 产品特点列表 */}
          <div className="space-y-3 mb-8">
            <h3 className="font-semibold text-lg">产品特点</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>高性能处理能力</li>
              <li>易于集成和部署</li>
              <li>完善的技术支持</li>
              <li>灵活的定制选项</li>
            </ul>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              立即咨询
            </button>
            <button className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors">
              下载资料
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
