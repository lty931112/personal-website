import type { ID, Timestamp } from "./index";

/**
 * 需求相关类型定义
 */

/** 需求优先级 */
export type RequirementPriority = "low" | "medium" | "high" | "urgent";

/** 需求状态 */
export type RequirementStatus =
  | "pending"      // 待处理
  | "reviewing"    // 审核中
  | "accepted"     // 已接受
  | "in_progress"  // 进行中
  | "completed"    // 已完成
  | "rejected";    // 已拒绝

/** 需求类型 */
export type RequirementCategory =
  | "feature"        // 新功能
  | "bug"            // Bug 修复
  | "improvement"    // 优化改进
  | "consultation";  // 技术咨询

/** 需求 */
export interface Requirement {
  /** 需求 ID */
  id: ID;
  /** 需求编号（如 REQ-2025-0001） */
  code: string;
  /** 需求标题 */
  title: string;
  /** 详细描述 */
  description: string;
  /** 需求类型 */
  category: RequirementCategory;
  /** 优先级 */
  priority: RequirementPriority;
  /** 状态 */
  status: RequirementStatus;
  /** 附件列表 */
  attachments: RequirementAttachment[];
  /** 提交人信息 */
  submitter: {
    id: ID;
    name: string;
    contact: string;
  };
  /** 处理人信息 */
  assignee?: {
    id: ID;
    name: string;
  };
  /** 处理备注 */
  remark?: string;
  /** 创建时间 */
  createdAt: Timestamp;
  /** 更新时间 */
  updatedAt: Timestamp;
}

/** 需求附件 */
export interface RequirementAttachment {
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

/** 创建需求的请求参数 */
export interface RequirementFormData {
  /** 需求标题 */
  title: string;
  /** 详细描述 */
  description: string;
  /** 需求类型 */
  category: RequirementCategory;
  /** 优先级 */
  priority: RequirementPriority;
  /** 提交人姓名 */
  submitterName: string;
  /** 联系方式 */
  contact: string;
  /** 附件 ID 列表 */
  attachmentIds?: ID[];
}

/** 需求列表查询参数 */
export interface RequirementListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  category?: RequirementCategory;
  priority?: RequirementPriority;
  status?: RequirementStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
