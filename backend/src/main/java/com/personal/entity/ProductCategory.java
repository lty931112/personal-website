package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 产品分类实体类
 * 对应数据库表：product_category
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("product_category")
public class ProductCategory extends BaseEntity {

    /**
     * 分类名称
     */
    private String name;

    /**
     * 分类描述
     */
    private String description;

    /**
     * 分类图标 URL
     */
    private String icon;

    /**
     * 排序权重
     */
    private Integer sortOrder;

    /**
     * 父分类 ID（顶级分类为 null）
     */
    private Long parentId;
}
