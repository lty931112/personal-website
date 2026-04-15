package com.personal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

/**
 * 创建博客文章请求 DTO
 *
 * @author personal
 */
@Data
public class BlogCreateRequest {

    /**
     * 文章标题
     */
    @NotBlank(message = "文章标题不能为空")
    @Size(max = 200, message = "文章标题长度不能超过200个字符")
    private String title;

    /**
     * 文章摘要
     */
    @Size(max = 500, message = "文章摘要长度不能超过500个字符")
    private String summary;

    /**
     * 文章内容（Markdown 格式）
     */
    @NotBlank(message = "文章内容不能为空")
    private String content;

    /**
     * 封面图 URL
     */
    private String coverImage;

    /**
     * 分类 ID
     */
    private Long categoryId;

    /**
     * 标签 ID 列表
     */
    private List<Long> tagIds;

    /**
     * 文章状态（0-草稿，1-已发布）
     */
    private Integer status;

    /**
     * 是否置顶
     */
    private Integer isTop;
}
