package com.personal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.common.BusinessException;
import com.personal.common.PageResult;
import com.personal.dto.request.KnowledgeCreateRequest;
import com.personal.dto.request.KnowledgeSearchRequest;
import com.personal.dto.response.KnowledgeResponse;
import com.personal.dto.response.KnowledgeSearchResponse;
import com.personal.entity.KnowledgeEntry;
import com.personal.entity.KnowledgeRelation;
import com.personal.mapper.KnowledgeEntryMapper;
import com.personal.mapper.KnowledgeRelationMapper;
import com.personal.magma.AdaptiveTraversal;
import com.personal.magma.ContextSynthesizer;
import com.personal.magma.MemoryEvolution;
import com.personal.magma.QueryRouter;
import com.personal.service.KnowledgeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 知识库服务实现类
 * 集成 MAGMA 模块实现智能知识检索
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class KnowledgeServiceImpl implements KnowledgeService {

    private final KnowledgeEntryMapper knowledgeEntryMapper;
    private final KnowledgeRelationMapper knowledgeRelationMapper;
    private final QueryRouter queryRouter;
    private final AdaptiveTraversal adaptiveTraversal;
    private final ContextSynthesizer contextSynthesizer;
    private final MemoryEvolution memoryEvolution;

    @Override
    public KnowledgeResponse createKnowledge(KnowledgeCreateRequest request) {
        log.info("创建知识条目：{}", request.getTitle());

        KnowledgeEntry entry = new KnowledgeEntry();
        BeanUtils.copyProperties(request, entry);
        // 默认重要程度为 3
        if (entry.getImportance() == null) {
            entry.setImportance(3);
        }
        // 初始化访问次数
        entry.setAccessCount(0L);

        knowledgeEntryMapper.insert(entry);

        // 记录到 MAGMA 记忆演化
        memoryEvolution.recordCreation(entry);

        return convertToResponse(entry);
    }

    @Override
    public KnowledgeResponse updateKnowledge(Long id, KnowledgeCreateRequest request) {
        log.info("更新知识条目：id={}, title={}", id, request.getTitle());

        KnowledgeEntry entry = knowledgeEntryMapper.selectById(id);
        if (entry == null) {
            throw new BusinessException("知识条目不存在");
        }

        BeanUtils.copyProperties(request, entry);
        entry.setId(id);
        knowledgeEntryMapper.updateById(entry);

        // 记录到 MAGMA 记忆演化
        memoryEvolution.recordUpdate(entry);

        return convertToResponse(entry);
    }

    @Override
    public void deleteKnowledge(Long id) {
        log.info("删除知识条目：id={}", id);
        KnowledgeEntry entry = knowledgeEntryMapper.selectById(id);
        if (entry == null) {
            throw new BusinessException("知识条目不存在");
        }
        knowledgeEntryMapper.deleteById(id);
    }

    @Override
    public KnowledgeResponse getKnowledgeById(Long id) {
        KnowledgeEntry entry = knowledgeEntryMapper.selectById(id);
        if (entry == null) {
            throw new BusinessException("知识条目不存在");
        }
        // 增加访问次数
        entry.setAccessCount(entry.getAccessCount() + 1);
        knowledgeEntryMapper.updateById(entry);

        return convertToResponse(entry);
    }

    @Override
    public PageResult<KnowledgeResponse> getKnowledgeList(Integer pageNum, Integer pageSize, String category, String keyword) {
        Page<KnowledgeEntry> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<KnowledgeEntry> wrapper = new LambdaQueryWrapper<>();

        // 分类过滤
        if (StringUtils.hasText(category)) {
            wrapper.eq(KnowledgeEntry::getCategory, category);
        }
        // 关键词搜索
        if (StringUtils.hasText(keyword)) {
            wrapper.and(w -> w.like(KnowledgeEntry::getTitle, keyword)
                    .or().like(KnowledgeEntry::getContent, keyword)
                    .or().like(KnowledgeEntry::getTags, keyword));
        }
        // 按重要程度降序，再按创建时间降序
        wrapper.orderByDesc(KnowledgeEntry::getImportance);
        wrapper.orderByDesc(KnowledgeEntry::getCreatedAt);

        Page<KnowledgeEntry> result = knowledgeEntryMapper.selectPage(page, wrapper);

        List<KnowledgeResponse> records = result.getRecords().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return new PageResult<>(records, result.getTotal(), result.getCurrent(), result.getSize());
    }

    @Override
    public KnowledgeSearchResponse searchKnowledge(KnowledgeSearchRequest request) {
        log.info("MAGMA 知识检索：keyword={}, category={}", request.getKeyword(), request.getCategory());
        long startTime = System.currentTimeMillis();

        // 1. 查询意图路由 - 分析搜索意图
        QueryRouter.QueryIntent intent = queryRouter.route(request.getKeyword());

        // 2. 直接匹配搜索
        Page<KnowledgeEntry> page = new Page<>(request.getPageNum(), request.getPageSize());
        LambdaQueryWrapper<KnowledgeEntry> wrapper = new LambdaQueryWrapper<>();

        if (StringUtils.hasText(request.getKeyword())) {
            wrapper.and(w -> w.like(KnowledgeEntry::getTitle, request.getKeyword())
                    .or().like(KnowledgeEntry::getContent, request.getKeyword())
                    .or().like(KnowledgeEntry::getTags, request.getKeyword()));
        }
        if (StringUtils.hasText(request.getCategory())) {
            wrapper.eq(KnowledgeEntry::getCategory, request.getCategory());
        }
        if (request.getMinImportance() != null) {
            wrapper.ge(KnowledgeEntry::getImportance, request.getMinImportance());
        }
        wrapper.orderByDesc(KnowledgeEntry::getImportance);

        Page<KnowledgeEntry> directResult = knowledgeEntryMapper.selectPage(page, wrapper);
        List<KnowledgeResponse> directResponses = directResult.getRecords().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        // 3. 关联遍历（如果启用）
        List<KnowledgeResponse> relatedResponses = List.of();
        if (Boolean.TRUE.equals(request.getEnableTraversal()) && !directResult.getRecords().isEmpty()) {
            List<Long> entryIds = directResult.getRecords().stream()
                    .map(KnowledgeEntry::getId)
                    .collect(Collectors.toList());
            relatedResponses = adaptiveTraversal.traverse(entryIds, request.getTraversalDepth());
        }

        // 4. 上下文合成
        contextSynthesizer.synthesize(directResponses, relatedResponses, intent);

        long searchTime = System.currentTimeMillis() - startTime;

        // 构建响应
        KnowledgeSearchResponse response = new KnowledgeSearchResponse();
        response.setDirectResults(directResponses);
        response.setRelatedResults(relatedResponses);
        response.setDirectTotal(directResult.getTotal());
        response.setRelatedTotal((long) relatedResponses.size());
        response.setSearchTime(searchTime);
        response.setTraversalDepth(request.getTraversalDepth());

        return response;
    }

    /**
     * 将 KnowledgeEntry 实体转换为 KnowledgeResponse DTO
     */
    private KnowledgeResponse convertToResponse(KnowledgeEntry entry) {
        KnowledgeResponse response = new KnowledgeResponse();
        BeanUtils.copyProperties(entry, response);
        return response;
    }
}
