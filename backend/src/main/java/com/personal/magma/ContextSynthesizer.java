package com.personal.magma;

import com.personal.dto.response.KnowledgeResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * MAGMA 上下文合成器
 * 将直接匹配结果和关联遍历结果合成为统一的上下文
 * 对结果进行排序、去重和相关性评分
 *
 * @author personal
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ContextSynthesizer {

    /**
     * 合成上下文
     * 将直接匹配和关联遍历的结果合并，进行去重和排序
     *
     * @param directResults  直接匹配的知识条目
     * @param relatedResults 关联遍历的知识条目
     * @param intent         查询意图
     * @return 合成后的知识条目列表
     */
    public List<KnowledgeResponse> synthesize(List<KnowledgeResponse> directResults,
                                               List<KnowledgeResponse> relatedResults,
                                               QueryRouter.QueryIntent intent) {
        log.info("开始上下文合成：直接结果={}, 关联结果={}", directResults.size(), relatedResults.size());

        List<SynthesizedEntry> synthesized = new ArrayList<>();

        // 1. 添加直接匹配结果（高权重）
        for (KnowledgeResponse direct : directResults) {
            SynthesizedEntry entry = new SynthesizedEntry();
            entry.setResponse(direct);
            entry.setRelevanceScore(1.0); // 直接匹配，相关性最高
            entry.setSource("direct");
            synthesized.add(entry);
        }

        // 2. 添加关联结果（根据重要程度和遍历深度调整权重）
        for (KnowledgeResponse related : relatedResults) {
            // 去重：如果已在直接结果中，跳过
            if (synthesized.stream().anyMatch(e -> e.getResponse().getId().equals(related.getId()))) {
                continue;
            }

            SynthesizedEntry entry = new SynthesizedEntry();
            entry.setResponse(related);
            // 关联结果的相关性基于重要程度
            double relevance = 0.5;
            if (related.getImportance() != null) {
                relevance = 0.3 + (related.getImportance() / 5.0) * 0.5;
            }
            entry.setRelevanceScore(relevance);
            entry.setSource("related");
            synthesized.add(entry);
        }

        // 3. 根据意图调整排序策略
        synthesized.sort((a, b) -> {
            switch (intent) {
                case EXACT:
                    // 精确查询：优先直接匹配
                    return Double.compare(b.getRelevanceScore(), a.getRelevanceScore());
                case ASSOCIATIVE:
                    // 关联查询：综合考虑相关性和重要程度
                    double scoreA = a.getRelevanceScore() * 0.6 +
                            (a.getResponse().getImportance() != null ? a.getResponse().getImportance() / 5.0 : 0) * 0.4;
                    double scoreB = b.getRelevanceScore() * 0.6 +
                            (b.getResponse().getImportance() != null ? b.getResponse().getImportance() / 5.0 : 0) * 0.4;
                    return Double.compare(scoreB, scoreA);
                case CONCEPTUAL:
                    // 概念查询：优先重要程度高的
                    int impA = a.getResponse().getImportance() != null ? a.getResponse().getImportance() : 0;
                    int impB = b.getResponse().getImportance() != null ? b.getResponse().getImportance() : 0;
                    return impB - impA;
                default:
                    // 默认：按相关性排序
                    return Double.compare(b.getRelevanceScore(), a.getRelevanceScore());
            }
        });

        // 4. 提取排序后的结果
        List<KnowledgeResponse> finalResults = synthesized.stream()
                .map(SynthesizedEntry::getResponse)
                .collect(java.util.stream.Collectors.toList());

        log.info("上下文合成完成：最终结果数={}", finalResults.size());
        return finalResults;
    }

    /**
     * 合成后的条目内部类
     */
    private static class SynthesizedEntry {
        private KnowledgeResponse response;
        private double relevanceScore;
        private String source;

        public KnowledgeResponse getResponse() { return response; }
        public void setResponse(KnowledgeResponse response) { this.response = response; }
        public double getRelevanceScore() { return relevanceScore; }
        public void setRelevanceScore(double relevanceScore) { this.relevanceScore = relevanceScore; }
        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }
    }
}
