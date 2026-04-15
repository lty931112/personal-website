package com.personal.service;

import com.personal.common.PageResult;
import com.personal.dto.request.BlogCreateRequest;
import com.personal.dto.response.BlogResponse;

/**
 * 博客服务接口
 * 定义博客文章相关的业务方法
 *
 * @author personal
 */
public interface BlogService {

    /**
     * 创建博客文章
     *
     * @param request 创建博客请求
     * @return 博客响应
     */
    BlogResponse createBlog(BlogCreateRequest request);

    /**
     * 更新博客文章
     *
     * @param id      文章 ID
     * @param request 更新博客请求
     * @return 博客响应
     */
    BlogResponse updateBlog(Long id, BlogCreateRequest request);

    /**
     * 删除博客文章（逻辑删除）
     *
     * @param id 文章 ID
     */
    void deleteBlog(Long id);

    /**
     * 根据 ID 获取博客文章详情
     *
     * @param id 文章 ID
     * @return 博客响应
     */
    BlogResponse getBlogById(Long id);

    /**
     * 分页查询博客文章列表
     *
     * @param pageNum    页码
     * @param pageSize   每页数量
     * @param keyword    搜索关键词
     * @param categoryId 分类 ID
     * @param tagId      标签 ID
     * @return 分页博客列表
     */
    PageResult<BlogResponse> getBlogList(Integer pageNum, Integer pageSize, String keyword, Long categoryId, Long tagId);
}
