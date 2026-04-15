import type { ID, Timestamp } from "./index";

/**
 * 产品相关类型定义
 */

/** 产品 */
export interface Product {
  /** 产品 ID */
  id: ID;
  /** 产品名称 */
  name: string;
  /** 产品描述 */
  description: string;
  /** 详细介绍（Markdown / HTML） */
  detail: string;
  /** 产品图片列表 */
  images: string[];
  /** 产品价格 */
  price: number;
  /** 价格单位 */
  priceUnit: string;
  /** 产品分类 */
  category: ProductCategory;
  /** 产品标签 */
  tags: string[];
  /** 产品特点列表 */
  features: string[];
  /** 产品状态 */
  status: "active" | "inactive" | "coming_soon";
  /** 排序权重 */
  sortOrder: number;
  /** 创建时间 */
  createdAt: Timestamp;
  /** 更新时间 */
  updatedAt: Timestamp;
}

/** 产品分类 */
export interface ProductCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  /** 该分类下的产品数量 */
  productCount: number;
}

/** 创建/更新产品的请求参数 */
export interface ProductFormData {
  name: string;
  description: string;
  detail?: string;
  images?: string[];
  price?: number;
  priceUnit?: string;
  categoryId: ID;
  tags?: string[];
  features?: string[];
  status?: "active" | "inactive" | "coming_soon";
}

/** 产品列表查询参数 */
export interface ProductListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: ID;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
