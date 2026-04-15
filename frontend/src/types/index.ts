/**
 * 全局类型定义
 * 包含应用中通用的类型和接口
 */

/** 通用分页参数 */
export interface PaginationParams {
  /** 当前页码（从 1 开始） */
  page?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 排序字段 */
  sortBy?: string;
  /** 排序方向 */
  sortOrder?: "asc" | "desc";
}

/** 通用 ID 类型 */
export type ID = string;

/** 时间戳类型 */
export type Timestamp = string;

/** 通用键值对 */
export interface KeyValue {
  key: string;
  value: string;
}

/** 通用选项类型（用于下拉选择等） */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
