package com.personal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 创建知识条目请求 DTO
 *
 * @author personal
 */
@Data
public class KnowledgeCreateRequest {

    /**
     * 知识标题
     */
    @NotBlank(message = "知识标题不能为空")
    @Size(max = 200, message = "知识标题长度不能超过200个字符")
    private String title;

    /**
     * 知识内容（Markdown 格式）
     */
    @NotBlank(message = "知识内容不能为空")
    private String content;

    /**
     * 知识分类
     */
    @NotBlank(message = "知识分类不能为空")
    private String category;

    /**
     * 标签（逗号分隔）
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
     * 关联父条目 ID
     */
    private Long parentId;
}
