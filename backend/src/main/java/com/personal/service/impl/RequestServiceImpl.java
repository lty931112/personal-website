package com.personal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.personal.common.BusinessException;
import com.personal.common.PageResult;
import com.personal.common.enums.RequirementStatusEnum;
import com.personal.dto.request.RequirementSubmitRequest;
import com.personal.dto.response.RequirementResponse;
import com.personal.entity.Requirement;
import com.personal.mapper.RequirementMapper;
import com.personal.service.RequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

/**
 * 需求服务实现类
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequirementMapper requirementMapper;

    @Override
    public RequirementResponse submitRequirement(RequirementSubmitRequest request) {
        log.info("提交需求：title={}, type={}", request.getTitle(), request.getType());

        Requirement requirement = new Requirement();
        BeanUtils.copyProperties(request, requirement);
        // 默认状态为待处理
        requirement.setStatus(RequirementStatusEnum.PENDING.getCode());
        // 默认优先级为中
        if (requirement.getPriority() == null) {
            requirement.setPriority(2);
        }

        requirementMapper.insert(requirement);

        return convertToResponse(requirement);
    }

    @Override
    public RequirementResponse updateRequirementStatus(Long id, Integer status, String remark) {
        log.info("更新需求状态：id={}, status={}", id, status);

        Requirement requirement = requirementMapper.selectById(id);
        if (requirement == null) {
            throw new BusinessException("需求不存在");
        }

        requirement.setStatus(status);
        requirement.setHandleRemark(remark);
        requirement.setHandleTime(LocalDateTime.now());

        requirementMapper.updateById(requirement);

        return convertToResponse(requirement);
    }

    @Override
    public RequirementResponse getRequirementById(Long id) {
        Requirement requirement = requirementMapper.selectById(id);
        if (requirement == null) {
            throw new BusinessException("需求不存在");
        }
        return convertToResponse(requirement);
    }

    @Override
    public PageResult<RequirementResponse> getRequirementList(Integer pageNum, Integer pageSize, Integer status, String type) {
        Page<Requirement> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Requirement> wrapper = new LambdaQueryWrapper<>();

        // 状态过滤
        if (status != null) {
            wrapper.eq(Requirement::getStatus, status);
        }
        // 类型过滤
        if (StringUtils.hasText(type)) {
            wrapper.eq(Requirement::getType, type);
        }
        // 按创建时间降序
        wrapper.orderByDesc(Requirement::getCreatedAt);

        Page<Requirement> result = requirementMapper.selectPage(page, wrapper);

        java.util.List<RequirementResponse> records = result.getRecords().stream()
                .map(this::convertToResponse)
                .collect(java.util.stream.Collectors.toList());

        return new PageResult<>(records, result.getTotal(), result.getCurrent(), result.getSize());
    }

    @Override
    public void deleteRequirement(Long id) {
        log.info("删除需求：id={}", id);
        Requirement requirement = requirementMapper.selectById(id);
        if (requirement == null) {
            throw new BusinessException("需求不存在");
        }
        requirementMapper.deleteById(id);
    }

    /**
     * 将 Requirement 实体转换为 RequirementResponse DTO
     */
    private RequirementResponse convertToResponse(Requirement requirement) {
        RequirementResponse response = new RequirementResponse();
        BeanUtils.copyProperties(requirement, response);
        // 填充状态描述
        try {
            RequirementStatusEnum statusEnum = RequirementStatusEnum.fromCode(requirement.getStatus());
            response.setStatusDesc(statusEnum.getDescription());
        } catch (IllegalArgumentException e) {
            response.setStatusDesc("未知状态");
        }
        return response;
    }
}
