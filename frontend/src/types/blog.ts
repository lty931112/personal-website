import type { ID, Timestamp } from "./index";

/**
 * 博客相关类型定义
 */

/** 博客文章 */
export interface BlogPost {
  /** 文章 ID */
  id: ID;
  /** URL 标识（slug） */
  slug: string;
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  excerpt: string;
  /** 文章正文（Markdown / HTML） */
  content: string;
  /** 封面图片 URL */
  coverImage: string;
  /** 所属分类 */
  category: BlogCategory;
  /** 标签列表 */
  tags: BlogTag[];
  /** 作者信息 */
  author: {
    id: ID;
    name: string;
    avatar?: string;
  };
  /** 发布状态 */
  status: "draft" | "published" | "archived";
  /** 发布时间 */
  publishedAt: Timestamp | null;
  /** 创建时间 */
  createdAt: Timestamp;
  /** 更新时间 */
  updatedAt: Timestamp;
  /** 阅读量 */
  viewCount: number;
  /** 预计阅读时间（分钟） */
  readingTime: number;
}

/** 博客分类 */
export interface BlogCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  /** 该分类下的文章数量 */
  postCount: number;
}

/** 博客标签 */
export interface BlogTag {
  id: ID;
  name: string;
  slug: string;
  /** 该标签下的文章数量 */
  postCount: number;
}

/** 文章目录项 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** 创建/更新文章的请求参数 */
export interface BlogPostFormData {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  categoryId: ID;
  tagIds: ID[];
  status: "draft" | "published";
}

/** 博客列表查询参数 */
export interface BlogListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: ID;
  tagId?: ID;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
