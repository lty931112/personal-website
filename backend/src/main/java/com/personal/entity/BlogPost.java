package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 博客文章实体类
 * 对应数据库表：blog_post
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("blog_post")
public class BlogPost extends BaseEntity {

    /**
     * 文章标题
     */
    private String title;

    /**
     * 文章摘要
     */
    private String summary;

    /**
     * 文章内容（Markdown 格式）
     */
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
     * 作者 ID
     */
    private Long authorId;

    /**
     * 文章状态（0-草稿，1-已发布，2-已归档）
     */
    private Integer status;

    /**
     * 是否置顶（0-否，1-是）
     */
    private Integer isTop;

    /**
     * 浏览量
     */
    private Long viewCount;

    /**
     * 点赞数
     */
    private Long likeCount;

    /**
     * 排序权重
     */
    private Integer sortOrder;
}
