package com.personal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.common.BusinessException;
import com.personal.common.PageResult;
import com.personal.dto.request.ProductCreateRequest;
import com.personal.dto.response.ProductResponse;
import com.personal.entity.Product;
import com.personal.entity.ProductCategory;
import com.personal.mapper.ProductCategoryMapper;
import com.personal.mapper.ProductMapper;
import com.personal.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * 产品服务实现类
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final ProductCategoryMapper productCategoryMapper;

    @Override
    public ProductResponse createProduct(ProductCreateRequest request) {
        log.info("创建产品：{}", request.getName());

        Product product = new Product();
        BeanUtils.copyProperties(request, product);
        // 默认状态为上架
        if (product.getStatus() == null) {
            product.setStatus(1);
        }
        productMapper.insert(product);

        return convertToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductCreateRequest request) {
        log.info("更新产品：id={}, name={}", id, request.getName());

        Product product = productMapper.selectById(id);
        if (product == null) {
            throw new BusinessException("产品不存在");
        }

        BeanUtils.copyProperties(request, product);
        product.setId(id);
        productMapper.updateById(product);

        return convertToResponse(product);
    }

    @Override
    public void deleteProduct(Long id) {
        log.info("删除产品：id={}", id);
        Product product = productMapper.selectById(id);
        if (product == null) {
            throw new BusinessException("产品不存在");
        }
        productMapper.deleteById(id);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productMapper.selectById(id);
        if (product == null) {
            throw new BusinessException("产品不存在");
        }
        return convertToResponse(product);
    }

    @Override
    public PageResult<ProductResponse> getProductList(Integer pageNum, Integer pageSize, String keyword, Long categoryId) {
        Page<Product> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();

        // 关键词搜索
        if (StringUtils.hasText(keyword)) {
            wrapper.and(w -> w.like(Product::getName, keyword)
                    .or().like(Product::getDescription, keyword));
        }
        // 分类过滤
        if (categoryId != null) {
            wrapper.eq(Product::getCategoryId, categoryId);
        }
        // 只查询上架产品
        wrapper.eq(Product::getStatus, 1);
        // 按排序权重降序
        wrapper.orderByDesc(Product::getSortOrder);
        wrapper.orderByDesc(Product::getCreatedAt);

        Page<Product> result = productMapper.selectPage(page, wrapper);

        // 转换为响应 DTO
        java.util.List<ProductResponse> records = result.getRecords().stream()
                .map(this::convertToResponse)
                .collect(java.util.stream.Collectors.toList());

        return new PageResult<>(records, result.getTotal(), result.getCurrent(), result.getSize());
    }

    /**
     * 将 Product 实体转换为 ProductResponse DTO
     */
    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();
        BeanUtils.copyProperties(product, response);

        // 填充分类名称
        if (product.getCategoryId() != null) {
            ProductCategory category = productCategoryMapper.selectById(product.getCategoryId());
            if (category != null) {
                response.setCategoryName(category.getName());
            }
        }
        return response;
    }
}
