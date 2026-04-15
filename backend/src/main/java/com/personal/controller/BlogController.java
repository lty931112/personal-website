package com.personal.controller;

import com.personal.common.PageResult;
import com.personal.common.Result;
import com.personal.dto.request.BlogCreateRequest;
import com.personal.dto.response.BlogResponse;
import com.personal.service.BlogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 博客控制器
 * 提供博客文章 CRUD 接口
 *
 * @author personal
 */
@Tag(name = "博客管理", description = "博客文章相关接口")
@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    /**
     * 创建博客文章
     */
    @Operation(summary = "创建博客文章")
    @PostMapping
    public Result<BlogResponse> createBlog(@Valid @RequestBody BlogCreateRequest request) {
        return Result.success(blogService.createBlog(request));
    }

    /**
     * 更新博客文章
     */
    @Operation(summary = "更新博客文章")
    @PutMapping("/{id}")
    public Result<BlogResponse> updateBlog(@PathVariable Long id,
                                            @Valid @RequestBody BlogCreateRequest request) {
        return Result.success(blogService.updateBlog(id, request));
    }

    /**
     * 删除博客文章
     */
    @Operation(summary = "删除博客文章")
    @DeleteMapping("/{id}")
    public Result<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return Result.success();
    }

    /**
     * 获取博客文章详情
     */
    @Operation(summary = "获取博客文章详情")
    @GetMapping("/{id}")
    public Result<BlogResponse> getBlogById(@PathVariable Long id) {
        return Result.success(blogService.getBlogById(id));
    }

    /**
     * 分页查询博客文章列表
     */
    @Operation(summary = "分页查询博客文章列表")
    @GetMapping
    public Result<PageResult<BlogResponse>> getBlogList(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId) {
        return Result.success(blogService.getBlogList(pageNum, pageSize, keyword, categoryId, tagId));
    }
}
