package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.Requirement;
import org.apache.ibatis.annotations.Mapper;

/**
 * 需求 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface RequirementMapper extends BaseMapper<Requirement> {
}
