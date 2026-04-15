package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 博客标签实体类
 * 对应数据库表：blog_tag
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("blog_tag")
public class BlogTag extends BaseEntity {

    /**
     * 标签名称
     */
    private String name;

    /**
     * 标签颜色（用于前端展示）
     */
    private String color;

    /**
     * 标签描述
     */
    private String description;
}
