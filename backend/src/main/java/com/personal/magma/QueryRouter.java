package com.personal.magma;

import lombok.Data;

/**
 * MAGMA 查询意图路由
 * 分析用户查询意图，将查询路由到合适的检索策略
 *
 * @author personal
 */
@Data
public class QueryRouter {

    /**
     * 查询意图枚举
     */
    public enum QueryIntent {
        /** 精确查询 - 查找特定知识条目 */
        EXACT,
        /** 模糊查询 - 关键词匹配 */
        FUZZY,
        /** 关联查询 - 需要遍历关联知识 */
        ASSOCIATIVE,
        /** 概念查询 - 概念层面的理解 */
        CONCEPTUAL
    }

    /**
     * 查询意图分析结果
     */
    @Data
    public static class AnalysisResult {
        /** 检测到的意图 */
        private QueryIntent intent;
        /** 置信度（0-1） */
        private double confidence;
        /** 提取的关键词 */
        private String[] keywords;
        /** 建议的检索深度 */
        private int suggestedDepth;
    }

    /**
     * 路由查询到合适的检索策略
     * 分析查询文本，判断查询意图类型
     *
     * @param query 用户查询文本
     * @return 查询意图
     */
    public QueryIntent route(String query) {
        if (query == null || query.trim().isEmpty()) {
            return QueryIntent.FUZZY;
        }

        String trimmed = query.trim();

        // 简单的意图判断逻辑
        // TODO: 可替换为 NLP 模型进行更精确的意图识别

        // 如果查询包含"相关"、"关联"等词，判定为关联查询
        if (trimmed.contains("相关") || trimmed.contains("关联") || trimmed.contains("类似")) {
            return QueryIntent.ASSOCIATIVE;
        }

        // 如果查询包含"是什么"、"定义"、"概念"等词，判定为概念查询
        if (trimmed.contains("是什么") || trimmed.contains("定义") || trimmed.contains("概念")
                || trimmed.contains("原理") || trimmed.contains("为什么")) {
            return QueryIntent.CONCEPTUAL;
        }

        // 如果查询较短且精确，判定为精确查询
        if (trimmed.length() <= 10 && !trimmed.contains(" ")) {
            return QueryIntent.EXACT;
        }

        // 默认为模糊查询
        return QueryIntent.FUZZY;
    }

    /**
     * 分析查询意图，返回详细的分析结果
     *
     * @param query 用户查询文本
     * @return 分析结果
     */
    public AnalysisResult analyze(String query) {
        AnalysisResult result = new AnalysisResult();
        result.setIntent(route(query));
        result.setConfidence(0.8);
        result.setKeywords(query.split("\\s+"));
        result.setSuggestedDepth(result.getIntent() == QueryIntent.ASSOCIATIVE ? 2 : 1);
        return result;
    }
}
