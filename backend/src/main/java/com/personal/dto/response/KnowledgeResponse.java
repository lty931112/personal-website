package com.personal.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 知识条目响应 DTO
 *
 * @author personal
 */
@Data
public class KnowledgeResponse {

    /**
     * 知识条目 ID
     */
    private Long id;

    /**
     * 知识标题
     */
    private String title;

    /**
     * 知识内容
     */
    private String content;

    /**
     * 知识分类
     */
    private String category;

    /**
     * 标签列表
     */
    private String tags;

    /**
     * 知识来源
     */
    private String source;

    /**
     * 重要程度（1-5）
     */
    private Integer importance;

    /**
     * 访问次数
     */
    private Long accessCount;

    /**
     * 父条目 ID
     */
    private Long parentId;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
