package com.personal.controller;

import com.personal.common.PageResult;
import com.personal.common.Result;
import com.personal.dto.request.KnowledgeCreateRequest;
import com.personal.dto.request.KnowledgeSearchRequest;
import com.personal.dto.response.KnowledgeResponse;
import com.personal.dto.response.KnowledgeSearchResponse;
import com.personal.service.KnowledgeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 知识库控制器
 * 提供知识条目 CRUD 和 MAGMA 智能检索接口
 *
 * @author personal
 */
@Tag(name = "知识库管理", description = "知识条目相关接口")
@RestController
@RequestMapping("/api/knowledge")
@RequiredArgsConstructor
public class KnowledgeController {

    private final KnowledgeService knowledgeService;

    /**
     * 创建知识条目
     */
    @Operation(summary = "创建知识条目")
    @PostMapping
    public Result<KnowledgeResponse> createKnowledge(@Valid @RequestBody KnowledgeCreateRequest request) {
        return Result.success(knowledgeService.createKnowledge(request));
    }

    /**
     * 更新知识条目
     */
    @Operation(summary = "更新知识条目")
    @PutMapping("/{id}")
    public Result<KnowledgeResponse> updateKnowledge(@PathVariable Long id,
                                                      @Valid @RequestBody KnowledgeCreateRequest request) {
        return Result.success(knowledgeService.updateKnowledge(id, request));
    }

    /**
     * 删除知识条目
     */
    @Operation(summary = "删除知识条目")
    @DeleteMapping("/{id}")
    public Result<Void> deleteKnowledge(@PathVariable Long id) {
        knowledgeService.deleteKnowledge(id);
        return Result.success();
    }

    /**
     * 获取知识条目详情
     */
    @Operation(summary = "获取知识条目详情")
    @GetMapping("/{id}")
    public Result<KnowledgeResponse> getKnowledgeById(@PathVariable Long id) {
        return Result.success(knowledgeService.getKnowledgeById(id));
    }

    /**
     * 分页查询知识条目列表
     */
    @Operation(summary = "分页查询知识条目列表")
    @GetMapping
    public Result<PageResult<KnowledgeResponse>> getKnowledgeList(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword) {
        return Result.success(knowledgeService.getKnowledgeList(pageNum, pageSize, category, keyword));
    }

    /**
     * MAGMA 知识检索
     * 支持关键词搜索和关联遍历
     */
    @Operation(summary = "MAGMA 知识检索")
    @PostMapping("/search")
    public Result<KnowledgeSearchResponse> searchKnowledge(@RequestBody KnowledgeSearchRequest request) {
        return Result.success(knowledgeService.searchKnowledge(request));
    }
}
