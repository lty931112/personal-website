package com.personal.controller;

import com.personal.common.PageResult;
import com.personal.common.Result;
import com.personal.dto.request.RequirementSubmitRequest;
import com.personal.dto.response.RequirementResponse;
import com.personal.service.RequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 需求提交控制器
 * 提供需求提交和管理接口
 *
 * @author personal
 */
@Tag(name = "需求管理", description = "需求提交和管理相关接口")
@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    /**
     * 提交需求（公开接口，无需认证）
     */
    @Operation(summary = "提交需求")
    @PostMapping("/submit")
    public Result<RequirementResponse> submitRequirement(@Valid @RequestBody RequirementSubmitRequest request) {
        return Result.success(requestService.submitRequirement(request));
    }

    /**
     * 获取需求详情
     */
    @Operation(summary = "获取需求详情")
    @GetMapping("/{id}")
    public Result<RequirementResponse> getRequirementById(@PathVariable Long id) {
        return Result.success(requestService.getRequirementById(id));
    }

    /**
     * 分页查询需求列表
     */
    @Operation(summary = "分页查询需求列表")
    @GetMapping
    public Result<PageResult<RequirementResponse>> getRequirementList(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) String type) {
        return Result.success(requestService.getRequirementList(pageNum, pageSize, status, type));
    }

    /**
     * 更新需求状态（管理员操作）
     */
    @Operation(summary = "更新需求状态")
    @PutMapping("/{id}/status")
    public Result<RequirementResponse> updateRequirementStatus(
            @PathVariable Long id,
            @RequestParam Integer status,
            @RequestParam(required = false) String remark) {
        return Result.success(requestService.updateRequirementStatus(id, status, remark));
    }

    /**
     * 删除需求
     */
    @Operation(summary = "删除需求")
    @DeleteMapping("/{id}")
    public Result<Void> deleteRequirement(@PathVariable Long id) {
        requestService.deleteRequirement(id);
        return Result.success();
    }
}
