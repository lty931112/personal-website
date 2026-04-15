package com.personal.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 产品响应 DTO
 *
 * @author personal
 */
@Data
public class ProductResponse {

    /**
     * 产品 ID
     */
    private Long id;

    /**
     * 产品名称
     */
    private String name;

    /**
     * 产品描述
     */
    private String description;

    /**
     * 产品封面图 URL
     */
    private String coverImage;

    /**
     * 产品详情
     */
    private String content;

    /**
     * 分类 ID
     */
    private Long categoryId;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 产品状态
     */
    private Integer status;

    /**
     * 排序权重
     */
    private Integer sortOrder;

    /**
     * 产品官网链接
     */
    private String websiteUrl;

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
