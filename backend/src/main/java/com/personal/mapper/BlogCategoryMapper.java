package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.BlogCategory;
import org.apache.ibatis.annotations.Mapper;

/**
 * 博客分类 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface BlogCategoryMapper extends BaseMapper<BlogCategory> {
}
