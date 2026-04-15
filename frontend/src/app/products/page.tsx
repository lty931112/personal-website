import { ProductCard } from "@/components/products/ProductCard";

/**
 * 产品列表页
 * 展示所有产品，支持搜索和筛选
 */

/* 模拟产品数据，后续替换为 API 调用 */
const mockProducts = [
  {
    id: "1",
    name: "产品 A",
    description: "这是一款优秀的产品，具有强大的功能和出色的性能。",
    image: "/images/product-a.jpg",
    price: "¥999",
  },
  {
    id: "2",
    name: "产品 B",
    description: "高性能解决方案，满足企业级需求。",
    image: "/images/product-b.jpg",
    price: "¥1,999",
  },
  {
    id: "3",
    name: "产品 C",
    description: "轻量级工具，助力团队协作。",
    image: "/images/product-c.jpg",
    price: "¥499",
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">产品中心</h1>
        <p className="text-muted-foreground">
          浏览我们的全部产品，找到最适合您的解决方案。
        </p>
      </div>

      {/* 搜索和筛选栏 */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="搜索产品..."
          className="flex-1 max-w-md px-4 py-2 border rounded-lg bg-background"
        />
        <select className="px-4 py-2 border rounded-lg bg-background">
          <option value="">全部分类</option>
          <option value="software">软件</option>
          <option value="hardware">硬件</option>
          <option value="service">服务</option>
        </select>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
