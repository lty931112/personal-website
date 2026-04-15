package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 博客文章-标签关联实体类
 * 对应数据库表：blog_post_tag（多对多中间表）
 *
 * @author personal
 */
@Data
@TableName("blog_post_tag")
public class BlogPostTag implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 文章 ID
     */
    private Long postId;

    /**
     * 标签 ID
     */
    private Long tagId;
}
