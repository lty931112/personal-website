package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.BlogPost;
import org.apache.ibatis.annotations.Mapper;

/**
 * 博客文章 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface BlogPostMapper extends BaseMapper<BlogPost> {
}
