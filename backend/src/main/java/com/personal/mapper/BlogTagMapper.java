package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.BlogTag;
import org.apache.ibatis.annotations.Mapper;

/**
 * 博客标签 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface BlogTagMapper extends BaseMapper<BlogTag> {
}
