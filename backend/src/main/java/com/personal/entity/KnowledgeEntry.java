package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 知识条目实体类
 * 对应数据库表：knowledge_entry
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("knowledge_entry")
public class KnowledgeEntry extends BaseEntity {

    /**
     * 知识标题
     */
    private String title;

    /**
     * 知识内容（Markdown 格式）
     */
    private String content;

    /**
     * 知识分类
     */
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
     * 访问次数
     */
    private Long accessCount;

    /**
     * 关联父条目 ID（用于构建知识树）
     */
    private Long parentId;
}
