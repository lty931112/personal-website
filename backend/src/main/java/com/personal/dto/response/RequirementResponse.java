package com.personal.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 需求响应 DTO
 *
 * @author personal
 */
@Data
public class RequirementResponse {

    /**
     * 需求 ID
     */
    private Long id;

    /**
     * 需求标题
     */
    private String title;

    /**
     * 需求描述
     */
    private String description;

    /**
     * 需求类型
     */
    private String type;

    /**
     * 优先级
     */
    private Integer priority;

    /**
     * 需求状态
     */
    private Integer status;

    /**
     * 状态描述
     */
    private String statusDesc;

    /**
     * 提交人姓名
     */
    private String submitterName;

    /**
     * 提交人邮箱
     */
    private String submitterEmail;

    /**
     * 联系方式
     */
    private String contactInfo;

    /**
     * 处理备注
     */
    private String handleRemark;

    /**
     * 处理时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime handleTime;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
