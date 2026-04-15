package com.personal.magma;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.personal.dto.response.KnowledgeResponse;
import com.personal.entity.KnowledgeEntry;
import com.personal.entity.KnowledgeRelation;
import com.personal.mapper.KnowledgeEntryMapper;
import com.personal.mapper.KnowledgeRelationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * MAGMA 自适应遍历策略
 * 在知识图谱中进行智能遍历，发现关联知识
 * 根据关系权重和节点重要程度自适应调整遍历路径
 *
 * @author personal
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AdaptiveTraversal {

    private final KnowledgeRelationMapper knowledgeRelationMapper;
    private final KnowledgeEntryMapper knowledgeEntryMapper;

    /**
     * 从指定的知识条目出发，进行关联遍历
     *
     * @param entryIds 起始知识条目 ID 列表
     * @param maxDepth 最大遍历深度
     * @return 遍历发现的知识条目列表
     */
    public List<KnowledgeResponse> traverse(List<Long> entryIds, int maxDepth) {
        log.info("开始自适应遍历：起始节点数={}, 最大深度={}", entryIds.size(), maxDepth);

        Set<Long> visited = new HashSet<>(entryIds);
        List<KnowledgeResponse> results = new ArrayList<>();

        // 逐层遍历
        for (int depth = 1; depth <= maxDepth; depth++) {
            List<Long> currentLevel = new ArrayList<>(visited);
            List<Long> newDiscoveries = new ArrayList<>();

            for (Long entryId : currentLevel) {
                // 查询所有关联关系
                List<KnowledgeRelation> relations = knowledgeRelationMapper.selectList(
                        new LambdaQueryWrapper<KnowledgeRelation>()
                                .eq(KnowledgeRelation::getSourceId, entryId)
                                .or()
                                .eq(KnowledgeRelation::getTargetId, entryId)
                );

                for (KnowledgeRelation relation : relations) {
                    // 确定关联的目标节点
                    Long targetId = relation.getSourceId().equals(entryId)
                            ? relation.getTargetId()
                            : relation.getSourceId();

                    // 如果未访问过，加入发现列表
                    if (!visited.contains(targetId)) {
                        visited.add(targetId);
                        newDiscoveries.add(targetId);
                    }
                }
            }

            // 批量查询新发现的知识条目
            if (!newDiscoveries.isEmpty()) {
                List<KnowledgeEntry> entries = knowledgeEntryMapper.selectBatchIds(newDiscoveries);
                for (KnowledgeEntry entry : entries) {
                    KnowledgeResponse response = new KnowledgeResponse();
                    BeanUtils.copyProperties(entry, response);
                    results.add(response);
                }
                log.info("遍历深度 {}：发现 {} 条新知识", depth, newDiscoveries.size());
            }
        }

        // 按重要程度排序
        results.sort((a, b) -> {
            int importanceA = a.getImportance() != null ? a.getImportance() : 0;
            int importanceB = b.getImportance() != null ? b.getImportance() : 0;
            return importanceB - importanceA;
        });

        log.info("自适应遍历完成：共发现 {} 条关联知识", results.size());
        return results;
    }

    /**
     * 带权重阈值遍历
     * 只遍历关系权重大于指定阈值的知识条目
     *
     * @param entryIds     起始知识条目 ID 列表
     * @param maxDepth     最大遍历深度
     * @param weightThreshold 关系权重阈值（0-1）
     * @return 遍历发现的知识条目列表
     */
    public List<KnowledgeResponse> traverseWithWeight(List<Long> entryIds, int maxDepth, double weightThreshold) {
        log.info("带权重遍历：起始节点数={}, 最大深度={}, 权重阈值={}", entryIds.size(), maxDepth, weightThreshold);

        Set<Long> visited = new HashSet<>(entryIds);
        List<KnowledgeResponse> results = new ArrayList<>();

        for (int depth = 1; depth <= maxDepth; depth++) {
            List<Long> currentLevel = new ArrayList<>(visited);
            List<Long> newDiscoveries = new ArrayList<>();

            for (Long entryId : currentLevel) {
                List<KnowledgeRelation> relations = knowledgeRelationMapper.selectList(
                        new LambdaQueryWrapper<KnowledgeRelation>()
                                .eq(KnowledgeRelation::getSourceId, entryId)
                                .or()
                                .eq(KnowledgeRelation::getTargetId, entryId)
                );

                for (KnowledgeRelation relation : relations) {
                    // 过滤低权重关系
                    if (relation.getWeight() != null && relation.getWeight() < weightThreshold) {
                        continue;
                    }

                    Long targetId = relation.getSourceId().equals(entryId)
                            ? relation.getTargetId()
                            : relation.getSourceId();

                    if (!visited.contains(targetId)) {
                        visited.add(targetId);
                        newDiscoveries.add(targetId);
                    }
                }
            }

            if (!newDiscoveries.isEmpty()) {
                List<KnowledgeEntry> entries = knowledgeEntryMapper.selectBatchIds(newDiscoveries);
                for (KnowledgeEntry entry : entries) {
                    KnowledgeResponse response = new KnowledgeResponse();
                    BeanUtils.copyProperties(entry, response);
                    results.add(response);
                }
            }
        }

        return results;
    }
}
