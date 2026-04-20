"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExternalLink, Github, Eye } from "lucide-react";
import type { Product } from "@/types/product";

/**
 * 产品卡片组件
 * 在产品列表页中展示单个产品信息，带聚光灯效果
 */

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const statusLabel: Record<string, string> = {
    published: "已发布",
    draft: "开发中",
    archived: "已归档",
  };

  const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
    published: "default",
    draft: "secondary",
    archived: "outline",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/products/${product.id}`}>
        <SpotlightCard className="h-full">
          <div className="bg-card rounded-xl border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
            {/* 封面图 */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center relative overflow-hidden group">
              {product.coverImage ? (
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-6xl opacity-40">🚀</span>
              )}
              {/* 状态标签 */}
              <div className="absolute top-3 right-3">
                <Badge variant={statusVariant[product.status]}>
                  {statusLabel[product.status]}
                </Badge>
              </div>
            </div>

            {/* 内容 */}
            <div className="p-5 flex-1 flex flex-col">
              {/* 标题 */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {product.title}
              </h3>

              {/* 描述 */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>

              {/* 技术栈标签 */}
              {product.techStack && product.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-normal">
                      {tech}
                    </Badge>
                  ))}
                  {product.techStack.length > 4 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{product.techStack.length - 4}
                    </Badge>
                  )}
                </div>
              )}

              {/* 底部信息 */}
              <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  {product.demoUrl && (
                    <span className="inline-flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      演示
                    </span>
                  )}
                  {product.sourceUrl && (
                    <span className="inline-flex items-center gap-1">
                      <Github className="h-3 w-3" />
                      源码
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {product.viewCount}
                </span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Link>
    </motion.div>
  );
}
