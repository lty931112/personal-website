package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.Product;
import org.apache.ibatis.annotations.Mapper;

/**
 * 产品 Mapper 接口
 * 继承 MyBatis-Plus BaseMapper，提供基础 CRUD 操作
 *
 * @author personal
 */
@Mapper
public interface ProductMapper extends BaseMapper<Product> {
}
