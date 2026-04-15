package com.personal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 创建产品请求 DTO
 *
 * @author personal
 */
@Data
public class ProductCreateRequest {

    /**
     * 产品名称
     */
    @NotBlank(message = "产品名称不能为空")
    @Size(max = 100, message = "产品名称长度不能超过100个字符")
    private String name;

    /**
     * 产品描述
     */
    @Size(max = 500, message = "产品描述长度不能超过500个字符")
    private String description;

    /**
     * 产品封面图 URL
     */
    private String coverImage;

    /**
     * 产品详情（富文本）
     */
    private String content;

    /**
     * 产品分类 ID
     */
    private Long categoryId;

    /**
     * 产品状态（0-下架，1-上架）
     */
    private Integer status;

    /**
     * 排序权重
     */
    private Integer sortOrder;

    /**
     * 产品官网链接
     */
    @Size(max = 500, message = "官网链接长度不能超过500个字符")
    private String websiteUrl;
}
