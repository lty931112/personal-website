package com.personal.controller;

import com.personal.common.PageResult;
import com.personal.common.Result;
import com.personal.dto.request.ProductCreateRequest;
import com.personal.dto.response.ProductResponse;
import com.personal.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 产品控制器
 * 提供产品 CRUD 接口
 *
 * @author personal
 */
@Tag(name = "产品管理", description = "产品相关接口")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * 创建产品
     */
    @Operation(summary = "创建产品")
    @PostMapping
    public Result<ProductResponse> createProduct(@Valid @RequestBody ProductCreateRequest request) {
        return Result.success(productService.createProduct(request));
    }

    /**
     * 更新产品
     */
    @Operation(summary = "更新产品")
    @PutMapping("/{id}")
    public Result<ProductResponse> updateProduct(@PathVariable Long id,
                                                  @Valid @RequestBody ProductCreateRequest request) {
        return Result.success(productService.updateProduct(id, request));
    }

    /**
     * 删除产品
     */
    @Operation(summary = "删除产品")
    @DeleteMapping("/{id}")
    public Result<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return Result.success();
    }

    /**
     * 获取产品详情
     */
    @Operation(summary = "获取产品详情")
    @GetMapping("/{id}")
    public Result<ProductResponse> getProductById(@PathVariable Long id) {
        return Result.success(productService.getProductById(id));
    }

    /**
     * 分页查询产品列表
     */
    @Operation(summary = "分页查询产品列表")
    @GetMapping
    public Result<PageResult<ProductResponse>> getProductList(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId) {
        return Result.success(productService.getProductList(pageNum, pageSize, keyword, categoryId));
    }
}
