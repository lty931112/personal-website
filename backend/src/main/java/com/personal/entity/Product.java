package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 产品实体类
 * 对应数据库表：product
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("product")
public class Product extends BaseEntity {

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
     * 排序权重（值越大越靠前）
     */
    private Integer sortOrder;

    /**
     * 产品官网链接
     */
    private String websiteUrl;
}
