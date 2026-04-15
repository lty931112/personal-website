package com.personal.service;

import com.personal.common.PageResult;
import com.personal.dto.request.RequirementSubmitRequest;
import com.personal.dto.response.RequirementResponse;

/**
 * 需求服务接口
 * 定义需求提交和管理相关的业务方法
 *
 * @author personal
 */
public interface RequestService {

    /**
     * 提交需求
     *
     * @param request 提交需求请求
     * @return 需求响应
     */
    RequirementResponse submitRequirement(RequirementSubmitRequest request);

    /**
     * 更新需求状态
     *
     * @param id     需求 ID
     * @param status 新状态
     * @param remark 处理备注
     * @return 需求响应
     */
    RequirementResponse updateRequirementStatus(Long id, Integer status, String remark);

    /**
     * 根据 ID 获取需求详情
     *
     * @param id 需求 ID
     * @return 需求响应
     */
    RequirementResponse getRequirementById(Long id);

    /**
     * 分页查询需求列表
     *
     * @param pageNum  页码
     * @param pageSize 每页数量
     * @param status   状态过滤
     * @param type     类型过滤
     * @return 分页需求列表
     */
    PageResult<RequirementResponse> getRequirementList(Integer pageNum, Integer pageSize, Integer status, String type);

    /**
     * 删除需求（逻辑删除）
     *
     * @param id 需求 ID
     */
    void deleteRequirement(Long id);
}
