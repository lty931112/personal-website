package com.personal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.common.BusinessException;
import com.personal.common.PageResult;
import com.personal.dto.request.BlogCreateRequest;
import com.personal.dto.response.BlogResponse;
import com.personal.entity.BlogCategory;
import com.personal.entity.BlogPost;
import com.personal.entity.BlogPostTag;
import com.personal.entity.BlogTag;
import com.personal.mapper.BlogCategoryMapper;
import com.personal.mapper.BlogPostMapper;
import com.personal.mapper.BlogPostTagMapper;
import com.personal.mapper.BlogTagMapper;
import com.personal.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 博客服务实现类
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogPostMapper blogPostMapper;
    private final BlogCategoryMapper blogCategoryMapper;
    private final BlogTagMapper blogTagMapper;
    private final BlogPostTagMapper blogPostTagMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BlogResponse createBlog(BlogCreateRequest request) {
        log.info("创建博客文章：{}", request.getTitle());

        BlogPost blogPost = new BlogPost();
        BeanUtils.copyProperties(request, blogPost);
        // 默认状态为草稿
        if (blogPost.getStatus() == null) {
            blogPost.setStatus(0);
        }
        // 默认不置顶
        if (blogPost.getIsTop() == null) {
            blogPost.setIsTop(0);
        }
        // 初始化浏览量和点赞数
        blogPost.setViewCount(0L);
        blogPost.setLikeCount(0L);

        blogPostMapper.insert(blogPost);

        // 处理标签关联
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            saveBlogTags(blogPost.getId(), request.getTagIds());
        }

        return convertToResponse(blogPost);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BlogResponse updateBlog(Long id, BlogCreateRequest request) {
        log.info("更新博客文章：id={}, title={}", id, request.getTitle());

        BlogPost blogPost = blogPostMapper.selectById(id);
        if (blogPost == null) {
            throw new BusinessException("文章不存在");
        }

        BeanUtils.copyProperties(request, blogPost);
        blogPost.setId(id);
        blogPostMapper.updateById(blogPost);

        // 更新标签关联：先删除旧的，再添加新的
        if (request.getTagIds() != null) {
            blogPostTagMapper.delete(new LambdaQueryWrapper<BlogPostTag>()
                    .eq(BlogPostTag::getPostId, id));
            saveBlogTags(id, request.getTagIds());
        }

        return convertToResponse(blogPost);
    }

    @Override
    public void deleteBlog(Long id) {
        log.info("删除博客文章：id={}", id);
        BlogPost blogPost = blogPostMapper.selectById(id);
        if (blogPost == null) {
            throw new BusinessException("文章不存在");
        }
        blogPostMapper.deleteById(id);
    }

    @Override
    public BlogResponse getBlogById(Long id) {
        BlogPost blogPost = blogPostMapper.selectById(id);
        if (blogPost == null) {
            throw new BusinessException("文章不存在");
        }
        // 增加浏览量
        blogPost.setViewCount(blogPost.getViewCount() + 1);
        blogPostMapper.updateById(blogPost);

        return convertToResponse(blogPost);
    }

    @Override
    public PageResult<BlogResponse> getBlogList(Integer pageNum, Integer pageSize, String keyword, Long categoryId, Long tagId) {
        Page<BlogPost> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<BlogPost> wrapper = new LambdaQueryWrapper<>();

        // 只查询已发布的文章
        wrapper.eq(BlogPost::getStatus, 1);

        // 关键词搜索
        if (StringUtils.hasText(keyword)) {
            wrapper.and(w -> w.like(BlogPost::getTitle, keyword)
                    .or().like(BlogPost::getSummary, keyword));
        }
        // 分类过滤
        if (categoryId != null) {
            wrapper.eq(BlogPost::getCategoryId, categoryId);
        }
        // 标签过滤
        if (tagId != null) {
            List<Long> postIds = blogPostTagMapper.selectList(
                    new LambdaQueryWrapper<BlogPostTag>().eq(BlogPostTag::getTagId, tagId)
            ).stream().map(BlogPostTag::getPostId).collect(Collectors.toList());
            if (postIds.isEmpty()) {
                return new PageResult<>(List.of(), 0L, (long) pageNum, (long) pageSize);
            }
            wrapper.in(BlogPost::getId, postIds);
        }

        // 置顶优先，然后按创建时间降序
        wrapper.orderByDesc(BlogPost::getIsTop);
        wrapper.orderByDesc(BlogPost::getCreatedAt);

        Page<BlogPost> result = blogPostMapper.selectPage(page, wrapper);

        List<BlogResponse> records = result.getRecords().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        return new PageResult<>(records, result.getTotal(), result.getCurrent(), result.getSize());
    }

    /**
     * 保存文章标签关联
     */
    private void saveBlogTags(Long postId, List<Long> tagIds) {
        for (Long tagId : tagIds) {
            BlogPostTag postTag = new BlogPostTag();
            postTag.setPostId(postId);
            postTag.setTagId(tagId);
            blogPostTagMapper.insert(postTag);
        }
    }

    /**
     * 将 BlogPost 实体转换为 BlogResponse DTO
     */
    private BlogResponse convertToResponse(BlogPost blogPost) {
        BlogResponse response = new BlogResponse();
        BeanUtils.copyProperties(blogPost, response);

        // 填充分类名称
        if (blogPost.getCategoryId() != null) {
            BlogCategory category = blogCategoryMapper.selectById(blogPost.getCategoryId());
            if (category != null) {
                response.setCategoryName(category.getName());
            }
        }

        // 填充标签列表
        List<BlogPostTag> postTags = blogPostTagMapper.selectList(
                new LambdaQueryWrapper<BlogPostTag>().eq(BlogPostTag::getPostId, blogPost.getId()));
        if (!postTags.isEmpty()) {
            List<Long> tagIds = postTags.stream().map(BlogPostTag::getTagId).collect(Collectors.toList());
            List<BlogTag> tags = blogTagMapper.selectBatchIds(tagIds);
            List<BlogResponse.TagInfo> tagInfos = tags.stream().map(tag -> {
                BlogResponse.TagInfo tagInfo = new BlogResponse.TagInfo();
                tagInfo.setId(tag.getId());
                tagInfo.setName(tag.getName());
                tagInfo.setColor(tag.getColor());
                return tagInfo;
            }).collect(Collectors.toList());
            response.setTags(tagInfos);
        }

        return response;
    }
}
