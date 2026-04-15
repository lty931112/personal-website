package com.personal.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.personal.entity.KnowledgeEntry;
import org.apache.ibatis.annotations.Mapper;

/**
 * 知识条目 Mapper 接口
 *
 * @author personal
 */
@Mapper
public interface KnowledgeEntryMapper extends BaseMapper<KnowledgeEntry> {
}
