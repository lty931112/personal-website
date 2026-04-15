package com.personal.dto.request;

import lombok.Data;

/**
 * 知识检索请求 DTO
 * 用于 MAGMA 知识图谱检索
 *
 * @author personal
 */
@Data
public class KnowledgeSearchRequest {

    /**
     * 搜索关键词
     */
    private String keyword;

    /**
     * 知识分类过滤
     */
    private String category;

    /**
     * 标签过滤（逗号分隔）
     */
    private String tags;

    /**
     * 最小重要程度
     */
    private Integer minImportance;

    /**
     * 页码（从1开始）
     */
    private Integer pageNum = 1;

    /**
     * 每页数量
     */
    private Integer pageSize = 10;

    /**
     * 是否启用关联遍历
     */
    private Boolean enableTraversal = false;

    /**
     * 遍历深度
     */
    private Integer traversalDepth = 1;
}
