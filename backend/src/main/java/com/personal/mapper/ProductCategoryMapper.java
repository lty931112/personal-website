package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.ProductCategory;
import org.apache.ibatis.annotations.Mapper;

/**
 * 产品分类 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface ProductCategoryMapper extends BaseMapper<ProductCategory> {
}
