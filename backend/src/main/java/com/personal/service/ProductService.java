package com.personal.service;

import com.personal.common.PageResult;
import com.personal.dto.request.ProductCreateRequest;
import com.personal.dto.response.ProductResponse;

/**
 * 产品服务接口
 * 定义产品相关的业务方法
 *
 * @author personal
 */
public interface ProductService {

    /**
     * 创建产品
     *
     * @param request 创建产品请求
     * @return 产品响应
     */
    ProductResponse createProduct(ProductCreateRequest request);

    /**
     * 更新产品
     *
     * @param id      产品 ID
     * @param request 更新产品请求
     * @return 产品响应
     */
    ProductResponse updateProduct(Long id, ProductCreateRequest request);

    /**
     * 删除产品（逻辑删除）
     *
     * @param id 产品 ID
     */
    void deleteProduct(Long id);

    /**
     * 根据 ID 获取产品详情
     *
     * @param id 产品 ID
     * @return 产品响应
     */
    ProductResponse getProductById(Long id);

    /**
     * 分页查询产品列表
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param keyword  搜索关键词
     * @param categoryId 分类 ID
     * @return 分页产品列表
     */
    PageResult<ProductResponse> getProductList(Integer pageNum, Integer pageSize, String keyword, Long categoryId);
}
