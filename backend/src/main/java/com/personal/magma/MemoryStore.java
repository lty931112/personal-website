package com.personal.magma;

import com.personal.entity.KnowledgeEntry;

import java.util.List;

/**
 * MAGMA 记忆存储接口
 * 定义知识图谱的记忆存储和检索能力
 * MAGMA = Memory-Augmented Graph-based Memory Architecture
 *
 * @author personal
 */
public interface MemoryStore {

    /**
     * 存储知识条目到记忆图谱中
     *
     * @param entry 知识条目
     */
    void store(KnowledgeEntry entry);

    /**
     * 根据关键词检索相关记忆
     *
     * @param keyword 搜索关键词
     * @param limit   返回数量限制
     * @return 相关知识条目列表
     */
    List<KnowledgeEntry> recall(String keyword, int limit);

    /**
     * 获取与指定知识条目关联的所有条目
     *
     * @param entryId 知识条目 ID
     * @param depth   遍历深度
     * @return 关联知识条目列表
     */
    List<KnowledgeEntry> getAssociated(Long entryId, int depth);

    /**
     * 更新记忆中的知识条目
     *
     * @param entry 更新后的知识条目
     */
    void update(KnowledgeEntry entry);

    /**
     * 从记忆中移除知识条目
     *
     * @param entryId 知识条目 ID
     */
    void remove(Long entryId);
}
