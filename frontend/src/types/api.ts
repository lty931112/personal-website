/**
 * API 相关类型定义
 * 包含请求、响应的通用类型
 */

/** 通用 API 响应结构 */
export interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: number;
  /** 提示消息 */
  message: string;
  /** 响应数据 */
  data: T;
}

/** 分页响应结构 */
export interface PaginatedResponse<T = unknown> {
  /** 状态码 */
  code: number;
  /** 提示消息 */
  message: string;
  /** 响应数据 */
  data: T[];
  /** 分页信息 */
  pagination: PaginationInfo;
}

/** 分页信息 */
export interface PaginationInfo {
  /** 当前页码 */
  current: number;
  /** 每页条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  /** 总页数 */
  totalPages: number;
}

/** API 错误响应 */
export interface ApiErrorResponse {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}

/** 列表查询参数 */
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
