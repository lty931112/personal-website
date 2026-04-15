package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.BlogPostTag;
import org.apache.ibatis.annotations.Mapper;

/**
 * 博客文章-标签关联 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface BlogPostTagMapper extends BaseMapper<BlogPostTag> {
}
