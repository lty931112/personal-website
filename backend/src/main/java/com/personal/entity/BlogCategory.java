package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 博客分类实体类
 * 对应数据库表：blog_category
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("blog_category")
public class BlogCategory extends BaseEntity {

    /**
     * 分类名称
     */
    private String name;

    /**
     * 分类描述
     */
    private String description;

    /**
     * 分类图标
     */
    private String icon;

    /**
     * 排序权重
     */
    private Integer sortOrder;
}
