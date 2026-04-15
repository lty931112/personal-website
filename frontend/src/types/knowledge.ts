import type { ID, Timestamp } from "./index";

/**
 * 知识库相关类型定义
 */

/** 知识条目 */
export interface KnowledgeItem {
  /** 条目 ID */
  id: ID;
  /** 条目标题 */
  title: string;
  /** 条目内容（Markdown / HTML） */
  content: string;
  /** 条目摘要 */
  summary: string;
  /** 所属分类 */
  category: KnowledgeCategory;
  /** 标签列表 */
  tags: KnowledgeTag[];
  /** 附件列表 */
  attachments: KnowledgeAttachment[];
  /** 状态 */
  status: "published" | "draft" | "archived";
  /** 创建者 */
  createdBy: {
    id: ID;
    name: string;
  };
  /** 创建时间 */
  createdAt: Timestamp;
  /** 更新时间 */
  updatedAt: Timestamp;
}

/** 知识库分类 */
export interface KnowledgeCategory {
  id: ID;
  name: string;
  slug: string;
  description?: string;
  /** 该分类下的条目数量 */
  itemCount: number;
}

/** 知识库标签 */
export interface KnowledgeTag {
  id: ID;
  name: string;
  slug: string;
  /** 该标签下的条目数量 */
  itemCount: number;
}

/** 知识库附件 */
export interface KnowledgeAttachment {
  id: ID;
  /** 文件名 */
  name: string;
  /** 文件 URL */
  url: string;
  /** 文件大小（字节） */
  size: number;
  /** 文件类型 */
  mimeType: string;
}

/** 知识检索结果 */
export interface KnowledgeSearchResult {
  id: ID;
  title: string;
  excerpt: string;
  category: string;
  /** 相关度分数（0-100） */
  relevance: number;
  /** 高亮片段 */
  highlights?: string[];
}

/** 知识库列表查询参数 */
export interface KnowledgeListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: ID;
  tagId?: ID;
  status?: string;
}

/** 知识检索参数 */
export interface KnowledgeSearchParams {
  /** 搜索关键词 */
  query: string;
  /** 分类筛选 */
  categoryId?: ID;
  /** 分页 */
  page?: number;
  pageSize?: number;
}
