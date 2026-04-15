package com.personal.dto.response;

import lombok.Data;

import java.util.List;

/**
 * 知识检索响应 DTO
 * 包含直接匹配结果和关联遍历结果
 *
 * @author personal
 */
@Data
public class KnowledgeSearchResponse {

    /**
     * 直接匹配的知识条目列表
     */
    private List<KnowledgeResponse> directResults;

    /**
     * 关联遍历发现的知识条目列表
     */
    private List<KnowledgeResponse> relatedResults;

    /**
     * 直接匹配结果数量
     */
    private Long directTotal;

    /**
     * 关联结果数量
     */
    private Long relatedTotal;

    /**
     * 搜索耗时（毫秒）
     */
    private Long searchTime;

    /**
     * 遍历深度
     */
    private Integer traversalDepth;
}
