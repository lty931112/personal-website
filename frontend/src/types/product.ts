import type { ID, Timestamp } from "./index";

/**
 * 产品相关类型定义
 */

/** 产品 */
export interface Product {
  id: ID;
  title: string;
  description: string;
  content: string;           // Markdown 详细内容
  coverImage: string;
  categoryId: ID;
  category?: ProductCategory;
  techStack: string[];        // 技术栈标签
  demoUrl?: string;
  sourceUrl?: string;
  status: "published" | "draft" | "archived";
  sortOrder: number;
  viewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** 产品分类 */
export interface ProductCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

/** 产品列表查询参数 */
export interface ProductListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: ID;
  sortBy?: "createdAt" | "viewCount" | "sortOrder";
  sortOrder?: "asc" | "desc";
}
