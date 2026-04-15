package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 知识关系实体类
 * 对应数据库表：knowledge_relation
 * 用于描述知识条目之间的关联关系
 *
 * @author personal
 */
@Data
@TableName("knowledge_relation")
public class KnowledgeRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键 ID
     */
    private Long id;

    /**
     * 源知识条目 ID
     */
    private Long sourceId;

    /**
     * 目标知识条目 ID
     */
    private Long targetId;

    /**
     * 关系类型（如：相关、前置、包含、参考等）
     */
    private String relationType;

    /**
     * 关系权重（0-1，表示关联强度）
     */
    private Double weight;

    /**
     * 关系描述
     */
    private String description;
}
