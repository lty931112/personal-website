package com.personal.service;

import com.personal.common.PageResult;
import com.personal.dto.request.KnowledgeCreateRequest;
import com.personal.dto.request.KnowledgeSearchRequest;
import com.personal.dto.response.KnowledgeResponse;
import com.personal.dto.response.KnowledgeSearchResponse;

/**
 * 知识库服务接口
 * 定义知识条目相关的业务方法，包括 MAGMA 检索
 *
 * @author personal
 */
public interface KnowledgeService {

    /**
     * 创建知识条目
     *
     * @param request 创建知识条目请求
     * @return 知识条目响应
     */
    KnowledgeResponse createKnowledge(KnowledgeCreateRequest request);

    /**
     * 更新知识条目
     *
     * @param id      知识条目 ID
     * @param request 更新知识条目请求
     * @return 知识条目响应
     */
    KnowledgeResponse updateKnowledge(Long id, KnowledgeCreateRequest request);

    /**
     * 删除知识条目（逻辑删除）
     *
     * @param id 知识条目 ID
     */
    void deleteKnowledge(Long id);

    /**
     * 根据 ID 获取知识条目详情
     *
     * @param id 知识条目 ID
     * @return 知识条目响应
     */
    KnowledgeResponse getKnowledgeById(Long id);

    /**
     * 分页查询知识条目列表
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param category 分类过滤
     * @param keyword  搜索关键词
     * @return 分页知识条目列表
     */
    PageResult<KnowledgeResponse> getKnowledgeList(Integer pageNum, Integer pageSize, String category, String keyword);

    /**
     * MAGMA 知识检索
     * 支持关键词搜索和关联遍历
     *
     * @param request 知识检索请求
     * @return 知识检索响应（包含直接匹配和关联结果）
     */
    KnowledgeSearchResponse searchKnowledge(KnowledgeSearchRequest request);
}
