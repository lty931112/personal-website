package com.personal.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 提交需求请求 DTO
 *
 * @author personal
 */
@Data
public class RequirementSubmitRequest {

    /**
     * 需求标题
     */
    @NotBlank(message = "需求标题不能为空")
    @Size(max = 200, message = "需求标题长度不能超过200个字符")
    private String title;

    /**
     * 需求描述
     */
    @NotBlank(message = "需求描述不能为空")
    @Size(max = 2000, message = "需求描述长度不能超过2000个字符")
    private String description;

    /**
     * 需求类型（功能需求、Bug修复、优化建议、其他）
     */
    @NotBlank(message = "需求类型不能为空")
    private String type;

    /**
     * 优先级（1-低，2-中，3-高，4-紧急）
     */
    private Integer priority;

    /**
     * 提交人姓名
     */
    @NotBlank(message = "提交人姓名不能为空")
    @Size(max = 50, message = "姓名长度不能超过50个字符")
    private String submitterName;

    /**
     * 提交人邮箱
     */
    @Email(message = "邮箱格式不正确")
    private String submitterEmail;

    /**
     * 联系方式
     */
    private String contactInfo;
}
