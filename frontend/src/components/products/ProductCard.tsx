import Link from "next/link";

/**
 * 产品卡片组件
 * 在产品列表页中展示单个产品信息
 */

interface ProductCardProps {
  /** 产品 ID */
  id: string;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 产品图片 URL */
  image: string;
  /** 产品价格 */
  price: string;
}

export function ProductCard({
  id,
  name,
  description,
  image,
  price,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group block bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* 产品图片 */}
      <div className="aspect-video bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">产品图片</span>
      </div>

      {/* 产品信息 */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}</span>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            了解更多 &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
